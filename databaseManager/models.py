from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Participant(models.Model):
    YEAR_OF_STUDY_CHOICES = [
        ("1st year","1st year"),
        ("2nd year","2nd year"),
        ("3rd year","3rd year"),
        ("4th year", "4th year"),
        ("Masters","Masters"),
        ("PhD","PhD"),
    ]
    SHIRT_SIZE_CHOICES = [
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
        ("XL", "XL"),
    ]
    DIETARY_RESTRICTIONS_CHOICES = [
        ("None", "None",),
        ("Vegetarian", "Vegetarian"),
        ("Vegan", "Vegan"),
        ("Gluten-Free", "Gluten-Free"),
    ]
    ROLE_CHOICES = [
        ("Analysis","Analysis"),
        ("Visualization","Visualization"),
        ("Development","Development"),
        ("Design","Design"),
        ("Don't know","Don't know"),
        ("Don't care","Don't care"),
    ]
    id = models.TextField(
        primary_key=True
    )
    name = models.CharField(
        unique = True,
        max_length=100
    )
    email = models.EmailField()
    age = models.IntegerField()
    year_of_study = models.CharField(
        max_length=8,
        choices= YEAR_OF_STUDY_CHOICES,
        default="1st year"
    )
    shirt_size = models.CharField(
        max_length=2,
        choices = SHIRT_SIZE_CHOICES,
        default = "M"
    )
    university = models.CharField()
    dietary_restrictions = models.CharField(
        max_length=255,
        choices = DIETARY_RESTRICTIONS_CHOICES,
        blank=True,
        null=True
    )
    programming_skills = models.TextField()
    experience_level = models.CharField(max_length=50)
    hackathons_done = models.IntegerField()

    interests = models.TextField()
    preferred_role = models.CharField(
        max_length=255,
        choices = ROLE_CHOICES,
    )
    objective = models.TextField()
    interest_in_challenges = models.TextField()
    preferred_language = models.CharField()
    friend_registration = models.TextField()
    preferred_team_size = models.IntegerField()
    availability = models.TextField()


    introduction = models.TextField()
    technical_project = models.TextField()
    future_excitement = models.TextField()
    fun_fact = models.TextField()
    compatibility_field = models.IntegerField(
        null = True,
        blank = True,
    )


    def _str_(self):
        return self.id

class ParticipantLock(models.Model):
    id = models.OneToOneField(
        Participant,
        primary_key=True,
        on_delete=models.CASCADE
    )
    def _str_(self):
        return self.id
    class Meta:
        db_table = 'databaseManager_participantlock'

class ParticipantNoLock(models.Model):
    id = models.OneToOneField(
        Participant,
        primary_key=True,
        on_delete=models.CASCADE
    )
    def _str_(self):
        return self.id

    class Meta:
        db_table = 'databaseManager_participantnolock'

class Teams2024(models.Model):
    name = models.CharField(
        primary_key=True,
        unique = True,
        max_length=100
    )
    members = ArrayField(
        models.TextField(),
        null= True,
    )
    def _str_(self):
        return self.name

class Teams(models.Model):
    name = models.CharField(
        primary_key=True,
    )

    def _str_(self):
        return self.name
