import math
import uuid
from typing import Dict

from keyring.backends import null

from backend.Features import Features
from backend.algorithmImplementation import LanguageParser, algorithmLogic
from backend.algorithmImplementation.algorithmLogic import *
import dataclasses
class TeamFormationSystem:
    WEIGHTS = {
        "age": 1,
        "experience_level": 5,
        "hackathons_done": 2,
        "programming_skills": 3,
        "preferred_team_size": 2,
        "preferred_languages": 5,
        "preferred role" : 4
    } #values from 1 to 5, the bigger the value, the more important it becomes
    def __init__(self, participants: Dict[uuid.UUID, Features], max_team_size: int = 4):
        self.participants = participants
        self.teams = [[] for _ in range(math.ceil(len(participants) / max_team_size))]
        self.max_team_size = max_team_size
        self.nTeams = math.ceil(len(self.participants) / self.max_team_size)
        self.experience_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}

    def checkRoleDisp(self, roleToTry, team):
        for uid in team:
            r = self.participants[uid].preferred_role
            if r == roleToTry:
                return False
        return True

    def searchBestTeam(self, teams, expLevel: str, uidToTry):
        minExp = float('inf')
        bestTeamChoice = None
        for idt, team in enumerate(teams):
            if len(team) <= self.max_team_size:
                expOfTeam = sum(1 for member_id in team if self.participants[member_id].experience_level == expLevel)
                if expOfTeam < minExp and self.checkRoleDisp(self.participants[uidToTry],team):
                    minExp = expOfTeam
                    bestTeamChoice = idt
        return bestTeamChoice

    def getClusters(featureVectors, nTeams):
        scaler = StandardScaler()
        scaledFeatureVectors = scaler.fit_transform(featureVectors)
        initialClusters = KMeans(n_clusters=nTeams, random_state=50).fit_predict(scaledFeatureVectors)

        return initialClusters.fit_predict(featureVectors)    #not the best option tbh

    def createFeatureVector(self, features):
        featureVector = [
            self.experience_map[features.experience_level],
            features.age,
            features.hackathons_done,
            features.preferred_team_size,
            algorithmLogic.getLanguageValue(features.preferred_languages[0]),
            algorithmLogic.averageSkill(features)
        ]
        return featureVector

    def handleRemaining(self,remaining, teams):
        for uid in list(remaining):
            expLevel = self.participants[uid].experience_level
            bestTeamChoice = self.searchBestTeam(teams, expLevel,uid)
            return bestTeamChoice

    def getAllTeams(self):
        targetDistrib = { #try to make it equilibrate between teams
            "Beginner": math.ceil(len(self.participants) / 3),
            "Intermediate": math.ceil(len(self.participants) / 3),
            "Advanced": math.ceil(len(self.participants) / 3)
        }
        participantVects = []
        participantIds = []
        for id, features in self.participants.items():  #needed for the creation of clusters
            participantVects.append(self.createFeatureVector(features))
            participantIds.append(id)

        clusters = getClusters(participantVects, self.nTeams)

        teams = [[] for _ in range(self.nTeams)] #Create empty teams of correct size
        remaining = set(self.participants.keys())
        for itTeam in range(self.nTeams):
            participantsSpecificTeam = []
            for uid, cluster in zip(participantIds, clusters):
                if cluster == itTeam and uid in remaining:  #check that it is the correct team and isnt on a team yet
                    participantsSpecificTeam.append(uid)

            track_exp = defaultdict(int)    #idk another way around this
            for uid in participantsSpecificTeam:    #using the ones we collected before to check if exp lvl is alright
                expOfUser = self.participants[uid].experience_level #get experience level of user
                if len(teams[itTeam]) < self.max_team_size:
                    if track_exp[expOfUser] <= targetDistrib[expOfUser]: #checks if it still needs one of such experience
                        teams[itTeam].append(uid)
                        track_exp[expOfUser] += 1 #one more with this experience level
                        remaining.remove(uid)

        #handle reamining users
        if len(remaining) > 0:
            for uid in list(remaining):
                bestTeamChoice = self.handleRemaining(remaining, teams)
                if bestTeamChoice is not None:  #same as normal
                    teams[bestTeamChoice].append(uid)
                    remaining.remove(uid)

        return teams

    def display_teams(self, teams):
        for i, team in enumerate(teams):
            print(f"Team {i + 1}:")
            for participant_id in team:
                participant = self.participants[participant_id]
                print(f"- {participant.age} ({participant.hackathons_done}) with experience LvL {participant.experience_level} and {participant.programming_skills}")
            print()