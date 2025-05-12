from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/auth/', include(('apps.userauth.urls', 'userauth'), namespace='auth')),
    path('api/users/', include(('apps.users.urls', 'users'), namespace='users')),
    path("api/missions/", include("apps.missions.urls")),
    path("api/inventory/", include("apps.inventory.urls")),
    path("api/leaderboard/", include("apps.leaderboard.urls")),
]
