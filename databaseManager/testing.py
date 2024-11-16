import os
import django

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace 'your_project_name' with your actual project name
django.setup()

from databaseManager.participantDBController import getParticipant
from databaseManager.process_participants import readParticipants


readParticipants()

print(getParticipant("Sara Vilar"))