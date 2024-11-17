from collections import defaultdict
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from backend.algorithmImplementation import LanguageParser

def getLanguageValue(language):
    return LanguageParser.getLanguageValue(language)
def averageSkill(participant):
    return sum(participant.programming_skills.values()) / len(participant.programming_skills)
def getClusters(featureVectors, nTeams):
    scaler = StandardScaler()
    scaled_feature_vectors = scaler.fit_transform(featureVectors)
    initial_clusters = KMeans(n_clusters=nTeams, random_state=50).fit_predict(scaled_feature_vectors)
    return initial_clusters
def assignTeams(featureVectors, nTeams):
    clusters = getClusters(featureVectors, nTeams)
    teams = defaultdict(list)
    for id, cluster in enumerate(clusters):
        teams[cluster].append(id)
    return teams