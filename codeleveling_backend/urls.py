from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("apps.users.urls")),
    path("api/missions/", include("apps.missions.urls")),
    path("api/inventory/", include("apps.inventory.urls")),
    path("api/leaderboard/", include("apps.leaderboard.urls")),
]
