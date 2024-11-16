import os
import pandas as pd
import json
from django.forms.models import model_to_dict
from databaseManager.models import Participant
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
def get_participants(name):
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