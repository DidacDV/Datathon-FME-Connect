import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Cambia 'datathon.settings' por la ruta de tu archivo settings.py
django.setup()

from backend.process_participants import readParticipants

readParticipants()
