import os
import pandas as pd
import json

# Ruta absoluta al archivo JSON
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
json_file_path = os.path.join(base_dir, 'data', 'datathon_participants.json')

# Cargar los datos desde un archivo JSON
with open(json_file_path, 'r') as file:
    participants_data = json.load(file)

# Resto del código para procesar los datos
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
    "Technical Project": participant["technical_project"],
    "Future Excitement": participant["future_excitement"],
    "Fun Fact": participant["fun_fact"],
    "Preferred Languages": ", ".join(participant["preferred_languages"]),
    "Preferred Team Size": participant["preferred_team_size"],
    "Availability": ", ".join([f"{k}: {'Yes' if v else 'No'}" for k, v in participant["availability"].items()]),
    "Programming Skills": ", ".join([f"{skill}: {level}" for skill, level in participant["programming_skills"].items()]),
    "Challenges of Interest": ", ".join(participant["interest_in_challenges"])
} for participant in participants_data])

# Mostrar el DataFrame
print(data_frame)

# Guardar el DataFrame en un archivo CSV
csv_file_path = os.path.join(base_dir, 'data', 'participants_summary.csv')
data_frame.to_csv(csv_file_path, index=False)
