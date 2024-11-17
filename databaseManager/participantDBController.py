import ast
import os
import random

import pandas as pd
import json

from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict
from django.forms.models import model_to_dict

from databaseManager.models import Participant
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from pandas import isnull
from backend.Features import Features
from backend.ParticipantSerializer import ParticipantSerializer
from databaseManager.models import Participant, ParticipantLock, ParticipantNoLock, Teams2024
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


@api_view(['GET'])
def get_participant(request, id):
    participant = get_object_or_404(Participant, id=id)
    data = model_to_dict(participant)
    return Response(data, status=200)

def getParticipantJSON(name):
    try:
        participant = model_to_dict(Participant.objects.get(name=name))
        return json.dumps(participant)
    except Participant.DoesNotExist:
        # Handle the case where the participant doesn't exist
        print(f"No participant found with the name {name}.")
        return None

@api_view(['GET'])
def get_participants(request):
    participant = Participant.objects.all()
    data = [model_to_dict(participant) for participant in participant]
    return Response(data)
    
@api_view(['GET'])
def get_participant_by_id(request, id):
    try:
        participant = Participant.objects.get(id=id)
        data = model_to_dict(participant)
        return Response(data, status=200)
    except Participant.DoesNotExist:
        return Response({'error': 'Participant not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
def get_Teams2024(request):
    teams2024 = Teams2024.objects.all()
    data = []

    for team in teams2024:
        team_dict = model_to_dict(team)

        # Initialize an empty list for member details
        member_details = []

        # Check if members exists and is not None
        if team_dict.get('members'):
            for member_id in team_dict['members']:
                try:
                    participant = Participant.objects.get(id=member_id)
                    member_details.append({
                        'id': str(participant.id),
                        'name': participant.name
                    })
                except ObjectDoesNotExist:
                    member_details.append({
                        'id': member_id,
                        'name': None
                    })

        # Replace the array of UUIDs with the array of member details
        team_dict['members'] = member_details
        data.append(team_dict)

    return Response(data)

@api_view(['PATCH'])
def edit_participant(request, id):
    try:
        participant = Participant.objects.get(id=id)
    except Participant.DoesNotExist:
        return Response({'error': 'Participant not found'}, status=404)

    serializer = ParticipantSerializer(participant, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def edit_team(request, name):
    try:
        team = Teams2024.objects.get(name=name)
    except Teams2024.DoesNotExist:
        return Response({'error': 'Team not found'}, status=404)
    serializer = TeamSerializer(team, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def modifyParticipantEmail(name, email):
    try:
        participant = Participant.objects.get(name=name)
        participant.email = email
        participant.save()
    except Participant.DoesNotExist:
        # Handle the case where the participant doesn't exist
        print(f"No participant found with the name {name}.")
        return None

def getJSONFromPath(filePath):
    try:
        with open(filePath, 'r') as file:
            participants_data = json.load(file)
        return participants_data
    except FileNotFoundError:
        print(f"Error: File {filePath} is not found.")
        return []

    except json.JSONDecodeError:
        print(f"Error: File {filePath} is not a valid JSON file.")
        return []

def readParticipants(filePath):
    participants_data = getJSONFromPath(filePath)

    data_frame = pd.DataFrame([{
        "ID": participant["id"],
        "Name": participant["name"],
        "Email": participant["email"],
        "Age": participant["age"],
        "Year of Study": participant["year_of_study"],
        "Shirt Size": participant["shirt_size"],
        "University": participant["university"],
        "Dietary Restrictions": participant["dietary_restrictions"],
        "Interests": ", ".join(participant["interests"]),
        "Preferred Role": participant["preferred_role"],
        "Experience Level": participant["experience_level"],
        "Hackathons Done": participant["hackathons_done"],
        "Objective": participant["objective"],
        "Introduction": participant["introduction"],
        "Friend Registration": participant["friend_registration"],
        "Technical Project": participant["technical_project"],
        "Future Excitement": participant["future_excitement"],
        "Fun Fact": participant["fun_fact"],
        "Preferred Languages": ", ".join(participant["preferred_languages"]),
        "Preferred Team Size": participant["preferred_team_size"],
        "Availability": ", ".join([f"{k}: {'Yes' if v else 'No'}" for k, v in participant["availability"].items()]),
        "Programming Skills": ", ".join([f"{skill}: {level}" for skill, level in participant["programming_skills"].items()]),
        "Challenges of Interest": ", ".join(participant["interest_in_challenges"])
    } for participant in participants_data])
    for _, row in data_frame.iterrows():
        participant = Participant(
            id=row["ID"],
            name=row["Name"],
            email=row["Email"],
            age=row["Age"],
            year_of_study=row["Year of Study"],
            shirt_size=row["Shirt Size"],
            university=row["University"],
            dietary_restrictions=row["Dietary Restrictions"] if row["Dietary Restrictions"] else None,
            programming_skills=row["Programming Skills"],
            experience_level=row["Experience Level"],
            hackathons_done=row["Hackathons Done"],
            interests=row["Interests"],
            preferred_role=row["Preferred Role"],
            objective=row["Objective"],
            interest_in_challenges=row["Challenges of Interest"],
            preferred_language=row["Preferred Languages"],
            friend_registration=row["Friend Registration"],
            preferred_team_size=row["Preferred Team Size"],
            availability=row["Availability"],
            introduction=row["Introduction"],
            technical_project=row["Technical Project"],
            future_excitement=row["Future Excitement"],
            fun_fact=row["Fun Fact"]
        )
        participant.save()

        #If alone, add to lock OR If team size and team preferred size are equal (team is already closed).
        if 1 == participant.preferred_team_size or participant.preferred_team_size - 1 == len(participant.friend_registration):
            participant = ParticipantLock(
                id = participant
            )
            participant.save()
        else:
            participant = ParticipantNoLock(
                id = participant,
            )
            participant.save()

def calculateproperties(participant):
    properties = {}
    properties = [
        participant.age,
        participant.hackathons_done,
        len(participant.interests),
    ]
    return properties

def addLockedParticipants():
    added = []
    for locked in ParticipantLock.objects.all():
        if not added.__contains__(locked.id):
            participant = locked.id
            members = {str(participant.id)}
            if participant.preferred_team_size != 1:
                friends = ast.literal_eval(participant.friend_registration)
                for friend in friends:
                    members.add(friend)
            addTeam(members)
            added.append(members)
            locked.delete()


def readTeams():
    data = getJSONFromPath('/home/rubenpv/PycharmProjects/datathon/data/team_names.json')
    if 'team_names' in data:
        team_names = data['team_names']
        for name in team_names:
            team = Teams2024(
                name = name,
                members = [],
                score = 10.0
            )
            team.save()


def addTeam(members):
    empty_teams = list(Teams2024.objects.filter(members = []))
    if not empty_teams:
        raise ValueError("No available teams without members.")
    team = random.choice(empty_teams)
    for name in members:
        team.members.append(name)
    team.save()

def getAlgorithmDict():
    dictionary = {}
    for alone in ParticipantNoLock.objects.all():
        participant = alone.id

        #Create class feature.
        f = Features(
            participant.age,
            participant.experience_level,
            participant.hackathons_done,
            parse_programming_skills(participant.programming_skills),
            participant.preferred_team_size,
            participant.preferred_language
        )

        dictionary[participant.id] = f
    return dictionary

def parse_programming_skills(skills_str):
    # Split the string by commas to get individual skill-level pairs
    skills_list = skills_str.split(", ")

    # Create an empty dictionary to store the parsed skills
    skills_dict = {}

    for skill in skills_list:
        # Split each skill-level pair by the colon (:) to separate skill and level
        skill_name, level = skill.split(": ")

        # Convert the level to an integer and add to the dictionary
        skills_dict[skill_name] = int(level)

    return skills_dict