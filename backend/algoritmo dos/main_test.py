import os
import django
import ast
import random
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from databaseManager.models import ParticipantNoLock, Teams2024
from backend.Features import Features


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
        return set(ast.literal_eval(friend_registration_str))
    except (SyntaxError, ValueError) as e:
        print(f"Error al parsear lista de amigos: {e}")
        return set()

def get_training_data_from_participant(batch_size=100):
    """Obtiene los datos necesarios para entrenar el modelo desde Participant."""
    try:
        participants = Participant.objects.select_related('id').iterator(chunk_size=batch_size)
        training_data = []

        for participant in participants:
            try:
                data = {
                    "id": participant.id,
                    "name": participant.name,
                    "programming_skills": parse_programming_skills(participant.programming_skills) if participant.programming_skills else {},
                    "experience_level": participant.experience_level,
                    "preferred_role": participant.preferred_role,
                    "preferred_language": participant.preferred_language or "No especificado",
                    "friends": get_friends_list(participant.friend_registration) if participant.friend_registration else set(),
                    "label": participant.compatibility_label  # Usa el campo agregado
                }
                print(f"Datos procesados para participante {participant.id}: {data}")
                training_data.append(data)
            except Exception as e:
                print(f"Error procesando participante {participant.id}: {e}")
                continue

        return training_data
    except Exception as e:
        print(f"Error al obtener datos de Participant: {e}")
        return []



def get_relevant_data_for_relationships(batch_size=100):
    """Obtiene los datos necesarios para relacionar participantes en lotes."""
    try:
        nolock_participants = ParticipantNoLock.objects.select_related('id').iterator(chunk_size=batch_size)
        participants_data = []

        for nolock in nolock_participants:
            participant = nolock.id
            try:
                participants_data.append({
                    "id": participant.id,
                    "name": participant.name,
                    "programming_skills": parse_programming_skills(participant.programming_skills) if participant.programming_skills else {},
                    "experience_level": participant.experience_level,
                    "preferred_role": participant.preferred_role,
                    "preferred_team_size": participant.preferred_team_size,
                    "preferred_language": participant.preferred_language or "No especificado",
                    "friends": get_friends_list(participant.friend_registration) if participant.friend_registration else set()
                })
            except Exception as e:
                print(f"Error procesando participante {participant.id}: {e}")
                continue

        return participants_data
    except Exception as e:
        print(f"Error al obtener datos de ParticipantNoLock: {e}")
        return []


def calculate_compatibility_score(p1: dict, p2: dict) -> float:
    """Calcula la compatibilidad entre dos participantes."""
    score = 0.0

    # 1. Compatibilidad en habilidades de programación
    skill_complement = 0
    for skill, level in p1['programming_skills'].items():
        if skill in p2['programming_skills']:
            skill_diff = abs(level - p2['programming_skills'][skill])
            if skill_diff <= 2:
                skill_complement += 0.2  # Más puntos por habilidades similares
            else:
                skill_complement += 0.1  # Menos puntos por habilidades complementarias
    score += skill_complement

    # 2. Compatibilidad de nivel de experiencia
    if p1['experience_level'] == p2['experience_level']:
        score += 0.3  # Más peso a niveles de experiencia similares

    # 3. Diversidad de roles
    if p1['preferred_role'] != p2['preferred_role']:
        score += 0.4  # Fomenta diversidad de roles

    # 4. Compatibilidad de idiomas
    p1_languages = set(p1['preferred_language'].split(", ")) if p1['preferred_language'] else set()
    p2_languages = set(p2['preferred_language'].split(", ")) if p2['preferred_language'] else set()
    common_languages = p1_languages & p2_languages
    if common_languages:
        score += 0.3  # Más puntos por idiomas comunes

    # 5. Amistad preexistente
    if p1['id'] in p2['friends'] or p2['id'] in p1['friends']:
        score += 0.5  # Prioriza participantes que se conocen

    # 6. Compatibilidad en intereses
    p1_interests = set(p1.get('interests', "").split(", ")) if p1.get('interests') else set()
    p2_interests = set(p2.get('interests', "").split(", ")) if p2.get('interests') else set()
    common_interests = p1_interests & p2_interests
    if common_interests:
        score += len(common_interests) * 0.1  # 0.1 por cada interés común

    # 7. Compatibilidad en objetivos (opcional)
    if p1.get('objective') and p2.get('objective') and p1['objective'] == p2['objective']:
        score += 0.2  # Más puntos por objetivos similares

    # 8. Compatibilidad en disponibilidad
    p1_availability = set(p1.get('availability', "").split(", ")) if p1.get('availability') else set()
    p2_availability = set(p2.get('availability', "").split(", ")) if p2.get('availability') else set()
    if p1_availability & p2_availability:
        score += 0.2  # Más puntos si comparten disponibilidad

    # 9. Bonus por diversidad total
    # Fomenta equipos con una mezcla de habilidades poco comunes
    p1_skills_set = set(p1['programming_skills'].keys())
    p2_skills_set = set(p2['programming_skills'].keys())
    unique_skills = p1_skills_set ^ p2_skills_set
    score += len(unique_skills) * 0.05  # 0.05 por habilidad única

    return score

def calculate_compatibility_score_with_model(model, p1, p2):
    """Calcula la compatibilidad usando el modelo entrenado."""
    features = [
        sum([abs(p1['programming_skills'].get(skill, 0) - p2['programming_skills'].get(skill, 0)) <= 2
             for skill in set(p1['programming_skills']).union(p2['programming_skills'])]),
        int(p1['experience_level'] == p2['experience_level']),
        int(p1['preferred_role'] != p2['preferred_role']),
        len(set(p1['preferred_language'].split(", ")) & set(p2['preferred_language'].split(", "))),
        int(p1['id'] in p2['friends'] or p2['id'] in p1['friends']),
        len(set(p1.get('interests', "").split(", ")) & set(p2.get('interests', "").split(", "))),
        len(set(p1.get('availability', "").split(", ")) & set(p2.get('availability', "").split(", "))),
        len(set(p1['programming_skills'].keys()) ^ set(p2['programming_skills'].keys())),
    ]
    return model.predict_proba([features])[0][1]  # Probabilidad de compatibilidad

def apply_model_on_participantnolock(participants_data, model):
    """Forma equipos basados en datos de ParticipantNoLock usando el modelo entrenado."""
    processed_ids = set()

    for participant in participants_data:
        if participant["id"] in processed_ids:
            continue

        team_members = {participant["id"]}
        friends = participant["friends"]
        team_members.update(friends)

        spots_needed = participant["preferred_team_size"] - len(team_members)

        while spots_needed > 0:
            best_score = -1
            best_match = None

            for candidate in participants_data:
                if candidate["id"] in processed_ids or candidate["id"] in team_members:
                    continue

                score = calculate_compatibility_score_with_model(model, participant, candidate)
                if score > best_score:
                    best_score = score
                    best_match = candidate

            if best_match:
                team_members.add(best_match["id"])
                team_members.update(best_match["friends"])
                spots_needed = participant["preferred_team_size"] - len(team_members)
            else:
                break

        processed_ids.update(team_members)

        try:
            save_team_to_db(team_members)
        except ValueError as e:
            print(f"Error al guardar el equipo: {e}")


def train_compatibility_model(training_data):
    """Entrena un modelo de Random Forest para predecir compatibilidad."""
    X = [list(features.values()) for features, label in training_data]
    y = [label for features, label in training_data]

    # Verificar si las etiquetas no son todas iguales
    if len(set(y)) == 1:
        raise ValueError("Todas las etiquetas son iguales. El modelo no puede entrenarse.")
    
    # Dividir en entrenamiento y prueba
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluar el modelo
    y_pred = model.predict(X_test)
    print(f"Precisión del modelo: {accuracy_score(y_test, y_pred)}")

    return model

def generate_training_data_from_participant(participants_data):
    """Genera un dataset para entrenamiento con datos históricos de Participant."""
    training_data = []

    for i, p1 in enumerate(participants_data):
        for j, p2 in enumerate(participants_data):
            if i >= j:
                continue  # Evita pares duplicados o comparaciones consigo mismos

            features = {
                "skill_complement": sum(
                    [abs(p1['programming_skills'].get(skill, 0) - p2['programming_skills'].get(skill, 0)) <= 2
                     for skill in set(p1['programming_skills']).union(p2['programming_skills'])]
                ),
                "experience_match": int(p1['experience_level'] == p2['experience_level']),
                "role_diversity": int(p1['preferred_role'] != p2['preferred_role']),
                "common_languages": len(set(p1['preferred_language'].split(", ")) & set(p2['preferred_language'].split(", "))),
                "friendship": int(p1['id'] in p2['friends'] or p2['id'] in p1['friends']),
                "unique_skills": len(set(p1['programming_skills'].keys()) ^ set(p2['programming_skills'].keys())),
            }
            label = p1['label']  # Usa el valor real de `compatibility_label`
            training_data.append((features, label))

    print(f"Datos generados: {len(training_data)} pares")
    return training_data

def form_teams(participants_data: list, model):
    """Forma equipos y los inserta en la tabla Teams2024."""
    processed_ids = set()

    for participant in participants_data:
        if participant["id"] in processed_ids:
            continue

        team_members = {participant["id"]}
        friends = participant["friends"]
        team_members.update(friends)

        spots_needed = participant["preferred_team_size"] - len(team_members)

        while spots_needed > 0:
            best_score = -1
            best_match = None

            for candidate in participants_data:
                if candidate["id"] in processed_ids or candidate["id"] in team_members:
                    continue

                score = calculate_compatibility_score_with_model(model, participant, candidate)
                if score > best_score:
                    best_score = score
                    best_match = candidate

            if best_match:
                team_members.add(best_match["id"])
                team_members.update(best_match["friends"])
                spots_needed = participant["preferred_team_size"] - len(team_members)
            else:
                break

        processed_ids.update(team_members)

        try:
            save_team_to_db(team_members)
        except ValueError as e:
            print(f"Error al guardar el equipo: {e}")


def save_team_to_db(members: set):
    """Guarda un equipo en la tabla Teams2024."""
    empty_teams = list(Teams2024.objects.filter(members=[]))

    if not empty_teams:
        raise ValueError("No hay equipos disponibles sin miembros.")

    team = random.choice(empty_teams)
    team.members.extend(members)
    team.save()
    print(f"Equipo guardado en Teams2024: {team.name} con miembros {team.members}")


if __name__ == "__main__":
    # Paso 1: Entrenar el modelo con datos de Participant
    participant_training_data = get_training_data_from_participant(batch_size=100)
    training_data = generate_training_data_from_participant(participant_training_data)
    model = train_compatibility_model(training_data)

    # Paso 2: Aplicar el modelo en ParticipantNoLock
    participantnolock_data = get_relevant_data_for_relationships(batch_size=100)
    apply_model_on_participantnolock(participantnolock_data, model)

