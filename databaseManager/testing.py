import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'your_project_name' with your actual project name
django.setup()

from databaseManager.participantDBController import getParticipantJSON, modifyParticipantEmail, \
    addLockedParticipants, readTeams, getAlgorithmDict
from databaseManager.participantDBController import readParticipants


readParticipants('/home/rubenpv/Escritorio/datathon_participants.json')
readTeams()