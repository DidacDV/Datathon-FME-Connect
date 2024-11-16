from django.test import TestCase
from .models import *
# Create your tests here.

class ParticipantModelTest(TestCase):
    def setUp(self):
        Participant.objects.create(
            name="Omar",
            email="johndoe@example.com",
            age=25,
            year_of_study="Masters",
            shirt_size="L",
            university="Tech University",
            dietary_restrictions="Vegetarian",
            programming_skills="Python, JavaScript, SQL",
            experience_level="Intermediate",
            hackathons_done=3,
            interests="AI, Data Science, Web Development",
            preferred_role="Development",
            objective="Build innovative solutions",
            interest_in_challenges="Machine Learning and Web Development",
            preferred_language="Python",
            friend_registration="Friend's Name",
            preferred_team_size=4,
            availability="Full weekend",
            introduction="Hi, I'm John!",
            technical_project="Built a web scraper in Python",
            future_excitement="Working on cutting-edge AI projects",
            fun_fact="I can solve a Rubik's cube in under a minute",
        )

    def test_add_and_query_participant(self):
        """
        Test adding a participant, printing their name,
        and filtering based on a field.
        """
        # Retrieve the participant
        participant = Participant.objects.get(name="John Doe")

        # Print their name
        print(f"Participant Name: {participant.name}")

        # Filter participants by year of study
        masters_participants = Participant.objects.filter(year_of_study="Masters")

        # Assert that we have at least one participant in Masters
        self.assertGreaterEqual(masters_participants.count(), 1)

        # Print the filtered participants' names
        for p in masters_participants:
            print(f"Filtered Participant: {p.name}")
