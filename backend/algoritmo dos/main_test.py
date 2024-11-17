import os
import sys
import django
# Configuración de Django
sys.path.append('/home/omar/datathon')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
from sklearn.utils import class_weight
import random
import numpy as np
from joblib import Parallel, delayed



from databaseManager.models import Participant


def parse_programming_skills(skills_str: str) -> dict:
    """Convierte habilidades de programación de texto a un diccionario."""
    try:
        skills_dict = {}
        skills_list = skills_str.split(", ")
        for skill in skills_list:
            skill_name, level = skill.split(": ")
            skills_dict[skill_name] = int(level)
        return skills_dict
    except Exception as e:
        print(f"Error al parsear habilidades de programación: {e}")
        return {}


def get_friends_list(friend_registration_str: str) -> set:
    """Convierte la lista de amigos de texto a un conjunto."""
    try:
        return set(eval(friend_registration_str))  # Usar eval con precaución
    except Exception as e:
        print(f"Error al parsear lista de amigos: {e}")
        return set()


def transform_participant_data(participant):
    """Transforma los datos de un participante en un formato procesable."""
    return {
        "id": participant.id,
        "age": participant.age,
        "year_of_study": participant.year_of_study,
        "dietary_restrictions": participant.dietary_restrictions,
        "programming_skills": parse_programming_skills(participant.programming_skills),
        "experience_level": participant.experience_level,
        "hackathons_done": participant.hackathons_done,
        "interests": set(participant.interests.split(", ")) if participant.interests else set(),
        "preferred_role": participant.preferred_role,
        "objective": participant.objective,
        "interest_in_challenges": participant.interest_in_challenges,
        "preferred_language": participant.preferred_language,
        "friend_registration": get_friends_list(participant.friend_registration),
        "preferred_team_size": participant.preferred_team_size,
        "availability": set(participant.availability.split(", ")) if participant.availability else set(),
        "shirt_size": participant.shirt_size,
        "university": participant.university,
    }


def generate_features(participants_data, max_pairs=10000):
    """Genera características y etiquetas para una muestra de pares de participantes."""
    from itertools import combinations

    features_list = []
    pairs = []
    sampled_pairs = random.sample(list(combinations(participants_data, 2)), max_pairs)

    for p1, p2 in sampled_pairs:
        base_features = {
            "age_difference": abs(p1["age"] - p2["age"]),
            "year_of_study_match": int(p1["year_of_study"] == p2["year_of_study"]),
            "dietary_match": int(p1["dietary_restrictions"] == p2["dietary_restrictions"]),
            "shared_programming_skills": sum([
                abs(p1["programming_skills"].get(skill, 0) - p2["programming_skills"].get(skill, 0)) <= 2
                for skill in set(p1["programming_skills"]).union(p2["programming_skills"])
            ]),
            "experience_match": int(p1["experience_level"] == p2["experience_level"]),
            "hackathon_difference": abs(p1["hackathons_done"] - p2["hackathons_done"]),
            "common_interests": len(p1["interests"] & p2["interests"]),
            "role_diversity": int(p1["preferred_role"] != p2["preferred_role"]),
            "common_languages": len(set(p1["preferred_language"].split(", ")) & set(p2["preferred_language"].split(", "))),
            "friendship": int(p1["id"] in p2["friend_registration"] or p2["id"] in p1["friend_registration"]),
            "availability_overlap": len(p1["availability"] & p2["availability"]),
            "university_match": int(p1["university"] == p2["university"]),
            "shirt_size_match": int(p1["shirt_size"] == p2["shirt_size"]),
        }

        derived_features = {
            "skills_experience_ratio": base_features["shared_programming_skills"] / (base_features["experience_match"] + 1),
            "compatibility_score": (base_features["shared_programming_skills"] * 0.5 +
                                    base_features["common_interests"] * 0.3 +
                                    base_features["friendship"] * 0.2),
            "programming_skill_density": base_features["shared_programming_skills"] / (1 + len(p1["programming_skills"])),
            "normalized_hackathon_difference": base_features["hackathon_difference"] / (1 + p1["hackathons_done"] + p2["hackathons_done"]),
        }

        features = {**base_features, **derived_features}
        features_list.append(features)
        pairs.append((p1["id"], p2["id"]))

    return features_list, pairs


def optimize_logistic_regression(features, labels):
    """Optimiza los hiperparámetros del modelo de Regresión Logística."""
    X = [list(f.values()) for f in features]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    param_grid = {
        "C": [0.01, 0.1, 1],  # Reducción de combinaciones
        "solver": ["liblinear", "lbfgs"]
    }

    model = LogisticRegression(max_iter=1000, random_state=42, class_weight="balanced")
    grid_search = GridSearchCV(model, param_grid, cv=3, scoring="roc_auc", n_jobs=-1)
    grid_search.fit(X_scaled, labels)

    print(f"Mejores parámetros: {grid_search.best_params_}")
    print(f"Mejor precisión en validación cruzada: {grid_search.best_score_:.4f}")

    best_model = grid_search.best_estimator_
    return best_model, scaler


if __name__ == "__main__":
    # Carga y preprocesamiento de datos
    participants = Participant.objects.all()
    participants_data = [transform_participant_data(p) for p in participants]

    # Generar una muestra de características y etiquetas
    features_list, pairs = generate_features(participants_data, max_pairs=30000)
    labels = [
        1 if features["compatibility_score"] > 0.6 else 0
        for features in features_list
    ]

    # Optimizar el modelo
    model, scaler = optimize_logistic_regression(features_list, labels)

    # Evaluación
    X = [list(f.values()) for f in features_list]
    X_scaled = scaler.transform(X)
    predictions = model.predict(X_scaled)

    print("Reporte de clasificación:")
    print(classification_report(labels, predictions))

    print("Matriz de confusión:")
    print(confusion_matrix(labels, predictions))

    roc_auc = roc_auc_score(labels, model.predict_proba(X_scaled)[:, 1])
    print(f"ROC-AUC: {roc_auc:.4f}")
