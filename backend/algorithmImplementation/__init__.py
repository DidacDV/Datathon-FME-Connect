import uuid
from dataclasses import dataclass

from backend.Features import Features
from backend.algorithmImplementation.TeamFormationCalc import TeamFormationSystem
from backend.algorithmImplementation import LanguageParser
from backend.algorithmImplementation.algorithmLogic import *


@dataclass
class Participant:
    id: uuid.UUID
    features: Features

if __name__ == "__main__":
    # Create individual Feature objects for each participant
    features1 = Features(age=23, experience_level="Beginner", hackathons_done=2,
                         programming_skills={"Python": 4, "JavaScript": 3}, preferred_team_size=4,
                         preferred_languages=["Python"], preferred_role="Analysis")
    features2 = Features(age=22, experience_level="Beginner", hackathons_done=3,
                         programming_skills={"Python": 5, "R": 4}, preferred_team_size=4,
                         preferred_languages=["Python"],preferred_role="Analysis")

    # New participants
    features5 = Features(age=55, experience_level="Advanced", hackathons_done=55,
                         programming_skills={"Java": 3}, preferred_team_size=3,
                         preferred_languages=["Java"],preferred_role="Analysis")
    features6 = Features(age=25, experience_level="Intermediate", hackathons_done=1,
                         programming_skills={"JavaScript": 4, "Python": 5}, preferred_team_size=4,
                         preferred_languages=["JavaScript", "Python"],preferred_role="Analysis")
    features7 = Features(age=19, experience_level="Beginner", hackathons_done=2,
                         programming_skills={"C++": 5, "Python": 3}, preferred_team_size=3, preferred_languages=["C++"], preferred_role="Analysis")

    features3 = Features(age=199, experience_level="Advanced", hackathons_done=2,
                         programming_skills={"C++": 1}, preferred_team_size=1, preferred_languages=["C++"], preferred_role="Analysis")

    features10 = Features(age=1, experience_level="Intermediate", hackathons_done=2,
                         programming_skills={"C++": 1}, preferred_team_size=1, preferred_languages=["C++"], preferred_role="Analysis")


    features11 = Features(age=20, experience_level="Beginner", hackathons_done=2,
                         programming_skills={"C++": 4}, preferred_team_size=3, preferred_languages=["C++"], preferred_role="Analysis")

    participants = [
        Participant(
            id=uuid.uuid4(),
            features=features1  # Correct assignment of individual Features
        ),
        Participant(
            id=uuid.uuid4(),
            features=features11
        ),
        Participant(
            id=uuid.uuid4(),
            features=features2  # Correct assignment of individual Features
        ),
        Participant(
            id=uuid.uuid4(),
            features=features5
        ),
        Participant(
            id=uuid.uuid4(),
            features=features6
        ),
        Participant(
            id=uuid.uuid4(),
            features=features7
        ),
        Participant(
            id=uuid.uuid4(),
            features=features3
        ),
        Participant(
            id=uuid.uuid4(),
            features=features10
        )
    ]

    partInteams = {p.id: p.features for p in participants}

    team_system = TeamFormationSystem(partInteams, 4)
    formed_teams = team_system.getAllTeams()
    team_system.display_teams(formed_teams)
