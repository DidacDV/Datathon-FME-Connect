import os
import pandas as pd
import json
from databaseManager.models import Participant

def getParticipant(name):
    try:
        participant = Participant.objects.get(name=name)
        return participant
    except Participant.DoesNotExist:
        # Handle the case where the participant doesn't exist
        print(f"No participant found with the name {name}.")
        return None
