import ast
import math
import uuid
from typing import Dict
from collections import defaultdict
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

from backend.Features import Features
from backend.algorithmImplementation import LanguageParser, algorithmLogic
from backend.algorithmImplementation.algorithmLogic import *
from databaseManager.participantDBController import addTeam


class TeamFormationSystem:
    WEIGHTS = {
        "age": 1,
        "experience_level": 4,
        "hackathons_done": 1,
        "programming_skills": 3,
        "preferred_team_size": 2,
        "preferred_languages": 5,
        "preferred_role": 4,
        "availability": 5,
        "university": 2,
        "friends": 7
    }

    def __init__(self, participants: Dict[uuid.UUID, Features], max_team_size: int = 4):
        self.participants = participants
        self.max_team_size = max_team_size
        # Calculate minimum number of teams needed
        self.nTeams = math.ceil(len(self.participants) / max_team_size)
        self.experience_map = {"Beginner": 1, "Intermediate": 2, "Advanced": 3}

    def checkRoleDisp(self, roleToTry, team):
        for uid in team:
            r = self.participants[uid].preferred_role
            if r == roleToTry:
                return False
        return True

    def toNum(self, uid):
        ret = 0

        return ret

    def countFriendsInTeam(self, team, uidToTry):
        friend_count = 0
        user_friends = self.participants[uidToTry].friend_registration
        for uid in team:
            if uid in user_friends:
                friend_count += 1
        return friend_count

    def searchBestTeam(self, teams, expLevel: str, uidToTry):
        bestTeamScore = float('-inf')
        bestTeamChoice = None
        disponiblityToTry = self.toNum(uidToTry)
        for team_index, team in enumerate(teams):
            if len(team) < self.max_team_size:
                score = 0
                friends_in_team = self.countFriendsInTeam(team, uidToTry)
                score += self.WEIGHTS["friends"] * friends_in_team
                if self.checkRoleDisp(self.participants[uidToTry].preferred_role, team):
                    for uid in team:    #check values using weights predefined, add to team according to these values
                        score += self.WEIGHTS["age"] * int(self.participants[uidToTry].age == self.participants[uid].age)
                        score += self.WEIGHTS["programming_skills"] * int(algorithmLogic.averageSkill(self.participants[uidToTry]) == algorithmLogic.averageSkill(self.participants[uid]))
                        score += self.WEIGHTS["preferred_team_size"] * int(self.participants[uidToTry].preferred_team_size == self.participants[uid].preferred_team_size)
                        score += self.WEIGHTS["preferred_languages"] * int(algorithmLogic.getLanguageValue(self.participants[uidToTry].preferred_languages[0]) == algorithmLogic.getLanguageValue(self.participants[uid].preferred_languages[0]))
                        score += self.WEIGHTS["experience_level"] * int(self.participants[uidToTry].experience_level != expLevel)
                        score += self.WEIGHTS["preferred_role"] * int(self.participants[uidToTry].preferred_role != self.participants[uid].preferred_role)
                        score += self.WEIGHTS["availability"] * int(disponiblityToTry == self.toNum(uid))
                        score += self.WEIGHTS["university"] * int(self.participants[uidToTry].university != self.participants[uid].university)

                    if score > bestTeamScore:
                        bestTeamScore = score
                        bestTeamChoice = team_index

        return bestTeamChoice

    def getClusters(self, featureVectors, nTeams):
        if len(featureVectors) < nTeams:
            return [i for i in range(len(featureVectors))]
        scaler = StandardScaler()
        scaledFeatureVectors = scaler.fit_transform(featureVectors)
        kmeans = KMeans(n_clusters=nTeams, random_state=50) #nclusters is nteams because we want as many groups as teams can be (ideally)
        return kmeans.fit_predict(scaledFeatureVectors)

    def createFeatureVector(self, features):
        featureVector = [
            features.age,
            features.hackathons_done,
            features.preferred_team_size,
            algorithmLogic.getLanguageValue(features.preferred_languages[0]),
            algorithmLogic.averageSkill(features),
            self.experience_map[features.experience_level],
        ]
        return featureVector

    def getAllTeams(self):
        if len(self.participants) == 0:
            return []

        participantVects = []
        participantIds = []
        for id, features in self.participants.items():
            participantVects.append(self.createFeatureVector(features))
            participantIds.append(id)
        #initial clusters
        clusters = self.getClusters(participantVects, self.nTeams)
        teams = [[] for _ in range(max(clusters) + 1)]
        remaining = set(self.participants.keys())

        for team_idx in range(len(teams)):
            team_candidates = [uid for uid, cluster in zip(participantIds, clusters) if cluster == team_idx and uid in remaining]
            exp_count = defaultdict(int)
            for uid in team_candidates:
                if len(teams[team_idx]) < self.max_team_size: #it is not full
                    exp = self.participants[uid].experience_level
                    if exp_count[exp] < math.ceil(self.max_team_size / 3):  #TRY to balance experience, 3 should be nExperienceLevel
                        teams[team_idx].append(uid)
                        exp_count[exp] += 1
                        remaining.remove(uid)

        #clear all those who didn't fit on the firsts groups untill there are no more
        while remaining:
            uid = next(iter(remaining))
            bestTeamChoice = self.searchBestTeam(teams, self.participants[uid].experience_level, uid)
            if bestTeamChoice is not None and len(teams[bestTeamChoice]) < self.max_team_size:  #he can go onto the team as its not full
                teams[bestTeamChoice].append(uid)
                remaining.remove(uid)
            else:
                for team in teams:
                    if len(team) < self.max_team_size:
                        team.append(uid)
                        remaining.remove(uid)
                        break
                else:
                    if remaining:   #incase there is no space anywhere, create new team
                        teams.append([uid])
                        remaining.remove(uid)

        #rm empty (is it necessary)<?
        teams = [team for team in teams if team]
        return teams

    def save_teams(self, teams):
        for team in teams:
            addTeam(team)
