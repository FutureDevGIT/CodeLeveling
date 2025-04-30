from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.users.models import UserProfile
from apps.users.serializers import UserProfileSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView

class GlobalLeaderboard(ListAPIView):
    permission_classes = [AllowAny]
    queryset = UserProfile.objects.all().order_by('-level', '-xp')
    serializer_class = UserProfileSerializer
    pagination_class = PageNumberPagination

class LeaderboardView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Get top 10 by level, XP, and streak
        top_levels = UserProfile.objects.order_by('-level', '-xp')[:10]
        top_xp = UserProfile.objects.order_by('-xp')[:10]
        top_streak = UserProfile.objects.order_by('-streak')[:10]

        def serialize(users):
            return [
                {
                    "username": u.user.username,
                    "level": u.level,
                    "xp": u.xp,
                    "streak": u.streak
                } for u in users
            ]

        return Response({
            "top_levels": serialize(top_levels),
            "top_xp": serialize(top_xp),
            "top_streak": serialize(top_streak)
        })
