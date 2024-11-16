from django.contrib import admin
from django.urls import path

from databaseManager.participantDBController import get_participants

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/participants/', get_participants, name='get_participants'),
]
