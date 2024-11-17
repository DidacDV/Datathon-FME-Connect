import uuid
from dataclasses import dataclass

from backend.Features import Features
from backend.algorithmImplementation.TeamFormationCalc import TeamFormationSystem
from backend.algorithmImplementation import LanguageParser
from backend.algorithmImplementation.algorithmLogic import *
from databaseManager.participantDBController import getAlgorithmDict

@dataclass
class Participant:
    id: uuid.UUID
    features: Features

if __name__ == "__main__":
    participants = getAlgorithmDict()
    # Create individual Feature objects for each participant

    team_system = TeamFormationSystem(participants, 4)
    formed_teams = team_system.getAllTeams()
    team_system.display_teams(formed_teams)
