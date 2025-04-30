from django.urls import path
from .views import LeaderboardView, GlobalLeaderboard

urlpatterns = [
    path("summary/", LeaderboardView.as_view()),
    path("global/", GlobalLeaderboard.as_view()),
]