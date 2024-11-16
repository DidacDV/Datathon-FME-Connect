import os
import pandas as pd
import json

from databaseManager.models import Participant

# Ruta absoluta al archivo JSON
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_file_path = os.path.join(base_dir, 'data', 'datathon_participants.json')

# Cargar los datos desde un archivo JSON
with open(json_file_path, 'r') as file:
    participants_data = json.load(file)

# Resto del código para procesar los datos
def readParticipants():
    data_frame = pd.DataFrame([{
        "ID": participant["id"],
        "Name": participant["name"],
        "Email": participant["email"],
        "Age": participant["age"],
        "Year of Study": participant["year_of_study"],
        "Shirt Size": participant["shirt_size"],
        "University": participant["university"],
        "Dietary Restrictions": participant["dietary_restrictions"],
        "Interests": ", ".join(participant["interests"]),
        "Preferred Role": participant["preferred_role"],
        "Experience Level": participant["experience_level"],
        "Hackathons Done": participant["hackathons_done"],
        "Objective": participant["objective"],
        "Introduction": participant["introduction"],
        "Friend Registration": participant["friend_registration"],
        "Technical Project": participant["technical_project"],
        "Future Excitement": participant["future_excitement"],
        "Fun Fact": participant["fun_fact"],
        "Preferred Languages": ", ".join(participant["preferred_languages"]),
        "Preferred Team Size": participant["preferred_team_size"],
        "Availability": ", ".join([f"{k}: {'Yes' if v else 'No'}" for k, v in participant["availability"].items()]),
        "Programming Skills": ", ".join([f"{skill}: {level}" for skill, level in participant["programming_skills"].items()]),
        "Challenges of Interest": ", ".join(participant["interest_in_challenges"])
    } for participant in participants_data])
    for _, row in data_frame.iterrows():
        participant = Participant(
            name=row["Name"],
            email=row["Email"],
            age=row["Age"],
            year_of_study=row["Year of Study"],
            shirt_size=row["Shirt Size"],
            university=row["University"],
            dietary_restrictions=row["Dietary Restrictions"] if row["Dietary Restrictions"] else None,
            programming_skills=row["Programming Skills"],
            experience_level=row["Experience Level"],
            hackathons_done=row["Hackathons Done"],
            interests=row["Interests"],
            preferred_role=row["Preferred Role"],
            objective=row["Objective"],
            interest_in_challenges=row["Challenges of Interest"],
            preferred_language=row["Preferred Languages"],
            friend_registration=row["Friend Registration"],
            preferred_team_size=row["Preferred Team Size"],
            availability=row["Availability"],
            introduction=row["Introduction"],
            technical_project=row["Technical Project"],
            future_excitement=row["Future Excitement"],
            fun_fact=row["Fun Fact"]
        )
        participant.save()

    csv_file_path = os.path.join(base_dir, 'data', 'participants_summary.csv')
    data_frame.to_csv(csv_file_path, index=False)
