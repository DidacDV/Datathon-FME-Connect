from django.test import TestCase

from databaseManager.process_participants import readParticipants
from .models import *
# Create your tests here.

class ParticipantModelTest(TestCase):
    def setUp(self):
        readParticipants()

    def test_add_and_query_participant(self):
        """
        Test adding a participant, printing their name,
        and filtering based on a field.
        """
        # Retrieve the participant
        participant = Participant.objects.get(name="Sara Vilar")

        # Print their name
        print(f"Participant Name: {participant.name}")

        # Filter participants by year of study
        masters_participants = Participant.objects.filter(year_of_study="Masters")

        # Assert that we have at least one participant in Masters
        self.assertGreaterEqual(masters_participants.count(), 1)

        # Print the filtered participants' names
        for p in masters_participants:
            print(f"Filtered Participant: {p.name}")
