from django.contrib import admin
from django.urls import path
from databaseManager.participantDBController import get_participant, get_participants, edit_participant, get_Teams2024, \
    edit_team
from databaseManager.participantDBController import get_participant_by_id

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/participants/', get_participants, name='get_participants'),
    path('api/participants/<str:id>/', get_participant, name='get_participant'),
    path('api/participants/<uuid:id>/', get_participant_by_id, name='get_participant_by_id'),
    path('api/teams/', get_Teams2024, name='get_Teams2024'),
    path('api/participants/<str:participant_id>/', edit_participant, name='edit_participant'),
    path('teams/<str:name>/', edit_team , name='edit_team'),
]
