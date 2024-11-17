from django.contrib import admin
from django.urls import path
from databaseManager.participantDBController import get_participant, get_participants, edit_participant, get_teams, get_teams_by_year, \
    generate_teams_kmin, generate_teams_machine
from databaseManager.participantDBController import get_participant_by_id

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/participants/', get_participants, name='get_participants'),
    path('api/participants/<str:id>/', get_participant, name='get_participant'),
    path('api/participants/<uuid:id>/', get_participant_by_id, name='get_participant_by_id'),
    path('api/teams/', get_teams, name='get_teams'),
    path('api/teams/<str:year>/', get_teams_by_year, name='get_teams_by_year'),
    path('api/participants/<str:participant_id>/', edit_participant, name='edit_participant'),
    path('api/teams/generate_teams_kmin/',generate_teams_kmin, name='generate_teams_kmin'),
    path('api/teams/generate_teams_machine/', generate_teams_machine, name='generate_teams_machine'),

]
