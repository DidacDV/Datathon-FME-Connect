import os
import sys
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import GridSearchCV
from databaseManager.models import ParticipantNoLock, Teams2024

from itertools import combinations
import random

def parse_programming_skills(skills_str: str) -> dict:
    try:
        skills_dict = {}
        skills_list = skills_str.split(", ")
        for skill in skills_list:
            skill_name, level = skill.split(": ")
            skills_dict[skill_name] = int(level)
        return skills_dict
    except Exception:
        return {}

def get_friends_list(friend_registration_str: str) -> set:
    try:
        return set(eval(friend_registration_str))
    except Exception:
        return set()

def transform_participant_data(participant):
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
    all_pairs = list(combinations(participants_data, 2))
    total_pairs = len(all_pairs)
    if max_pairs > total_pairs:
        max_pairs = total_pairs
    sampled_pairs = random.sample(all_pairs, max_pairs)
    features_list = []
    pairs = []
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
    X = [list(f.values()) for f in features]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    param_grid = {"C": [0.01, 0.1, 1], "solver": ["liblinear", "lbfgs"]}
    model = LogisticRegression(max_iter=1000, random_state=42, class_weight="balanced")
    grid_search = GridSearchCV(model, param_grid, cv=3, scoring="roc_auc", n_jobs=-1)
    grid_search.fit(X_scaled, labels)
    best_model = grid_search.best_estimator_
    return best_model, scaler

from django.db import transaction

from django.db.models import Q

def create_teams(max_team_size=4):
    participants = ParticipantNoLock.objects.select_related('id').all()
    participants_data = [transform_participant_data(p.id) for p in participants]
    features_list, pairs = generate_features(participants_data, max_pairs=10000)
    labels = [
        1 if features["compatibility_score"] > 0.6 else 0
        for features in features_list
    ]
    model, scaler = optimize_logistic_regression(features_list, labels)
    unassigned_participants = participants_data[:]
    teams = []

    # Obtener equipos sin miembros existentes
    available_teams = list(Teams2024.objects.filter(Q(members__isnull=True) | Q(members=[])).values_list('name', flat=True))
    team_counter = 1

    while unassigned_participants:
        p1 = unassigned_participants.pop(0)
        potential_teammates = []
        for p2 in unassigned_participants:
            features = generate_features([p1, p2])[0][0]
            X = scaler.transform([list(features.values())])
            prediction = model.predict(X)[0]
            if prediction == 1:
                potential_teammates.append(p2)
        team = [p1] + potential_teammates[: max_team_size - 1]
        for member in team[1:]:
            unassigned_participants.remove(member)

        # Usar un nombre de equipo existente si está disponible
        if available_teams:
            team_name = available_teams.pop(0)
        else:
            team_name = f"Team_{team_counter}"
            team_counter += 1

        # Guardar el equipo en la base de datos
        team_members = [member["id"] for member in team]
        Teams2024.objects.update_or_create(
            name=team_name,
            defaults={"members": team_members},
        )
        teams.append((team_name, team_members))
    return teams

if __name__ == "__main__":
    with transaction.atomic():
        teams_created = create_teams(max_team_size=4)

