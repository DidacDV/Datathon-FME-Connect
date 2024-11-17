import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'your_project_name' with your actual project name
django.setup()


from databaseManager.participantDBController import getParticipantJSON, modifyParticipantEmail, \
    addLockedParticipants, readTeams, create_team_year_table
from databaseManager.participantDBController import readParticipants


readParticipants('/home/rubenpv/Escritorio/datathon_participants.json')
create_team_year_table("2024")
readTeams("2024")
addLockedParticipants("2024")
