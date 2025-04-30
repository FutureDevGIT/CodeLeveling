from django.urls import path
from .views import DailyMissionsView
from .views import ActiveMissionList
from .views import CompleteMissionView

urlpatterns = [
    path("daily/", DailyMissionsView.as_view(), name="daily_missions"),
    path("active/", ActiveMissionList.as_view(), name="active_missions"),
    path("complete/", CompleteMissionView.as_view(), name="complete_mission"),
]
