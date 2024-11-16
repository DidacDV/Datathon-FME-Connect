import math
import numpy as np
from dataclasses import dataclass
from typing import List, Dict
import uuid
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from backend.Features import Features
from backend.algorithmImplementation import LanguageParser



@dataclass
class Participant:
    id: uuid.UUID
    features: Features

def getLanguageValue(language):
    return LanguageParser.getLanguageValue(language)

def averageSkill(participant):
    return sum(participant.programming_skills.values()) / len(participant.programming_skills)

def getClusters(featureVectors, nTeams):
    scaler = StandardScaler()
    scaled_feature_vectors = scaler.fit_transform(featureVectors)
    initial_clusters = KMeans(n_clusters=nTeams, random_state=50).fit_predict(scaled_feature_vectors)
    return initial_clusters

assignedIds = set()
unassignedIds = set()

class TeamFormationSystem:
    def __init__(self, participants: Dict[uuid.UUID, Features], max_team_size: int = 4):
        self.participants = participants
        self.teams = [[] for _ in range(math.ceil(len(participants) / max_team_size))]
        self.max_team_size = max_team_size
        self.nTeams = math.ceil(len(self.participants) / self.max_team_size)
        self.experience_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}
        self.unassignedIds = set(participants.keys())
        self.assignedIds = set()

    def createFeatureVector(self, features):
        featureVector = [
            self.experience_map[features.experience_level],
            features.age,
            features.hackathons_done,
            features.preferred_team_size,
            getLanguageValue(features.preferred_languages[0]),
            averageSkill(features)
        ]
        return featureVector

    def handleOverflows(self):
        nClusters = len(self.unassignedIds) // self.max_team_size
        featureVectors = np.array([self.createFeatureVector(self.participants[p]) for p in self.unassignedIds])
        overflowClusters = getClusters(featureVectors, nClusters)
        for p, teamId in zip(self.unassignedIds, overflowClusters):
            if len(self.teams[teamId]) < self.max_team_size:
                self.teams[teamId].append(p)
                self.assignedIds.add(p)
                self.unassignedIds.remove(p)

    def getAllTeams(self):
        featureVectors = np.array([self.createFeatureVector(p) for p in self.participants.values()])
        initialClusters = getClusters(featureVectors, self.nTeams)
        for p, teamId in zip(self.participants, initialClusters):
            if len(self.teams[teamId]) < self.max_team_size:
                self.teams[teamId].append(p)
                self.assignedIds.add(p)
                self.unassignedIds.remove(p)

        if len(unassignedIds) > 0:  self.handleOverflows()
        return self.teams

    def display_teams(self, teams):
        for i, team in enumerate(teams):
            print(f"Team {i + 1}:")
            for participant_id in team:
                participant = self.participants[participant_id]
                print(f"- {participant.age} ({participant.hackathons_done})")
            print()


if __name__ == "__main__":
    # Create individual Feature objects for each participant
    features1 = Features(age=23, experience_level="Intermediate", hackathons_done=2,
                         programming_skills={"Python": 4, "JavaScript": 3}, preferred_team_size=4,
                         preferred_languages=["Python"])
    features2 = Features(age=22, experience_level="Beginner", hackathons_done=3,
                         programming_skills={"Python": 5, "R": 4}, preferred_team_size=4,
                         preferred_languages=["Python"])

    # New participants
    features5 = Features(age=55, experience_level="Advanced", hackathons_done=55,
                         programming_skills={"Java": 3}, preferred_team_size=3,
                         preferred_languages=["Java"])
    features6 = Features(age=25, experience_level="Intermediate", hackathons_done=1,
                         programming_skills={"JavaScript": 4, "Python": 5}, preferred_team_size=4,
                         preferred_languages=["JavaScript", "Python"])
    features7 = Features(age=19, experience_level="Beginner", hackathons_done=2,
                         programming_skills={"C++": 5, "Python": 3}, preferred_team_size=3, preferred_languages=["C++"])

    features3 = Features(age=19, experience_level="Beginner", hackathons_done=2,
                         programming_skills={"C++": 5, "Python": 3}, preferred_team_size=3, preferred_languages=["C++"])

    participants = [
        Participant(
            id=uuid.uuid4(),
            features=features1  # Correct assignment of individual Features
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
        )
    ]

    partInteams = {p.id: p.features for p in participants}

    team_system = TeamFormationSystem(partInteams, 4)
    formed_teams = team_system.getAllTeams()
    team_system.display_teams(formed_teams)
