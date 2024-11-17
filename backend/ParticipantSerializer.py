from rest_framework import serializers
from databaseManager.models import Participant

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'