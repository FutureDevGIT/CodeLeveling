from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Returns authenticated user profile data
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = getattr(user, 'profile', None)  # for extended user model

        return Response({
            'username': user.username,
            'email': user.email,
            'xp': getattr(profile, 'xp', 0),
            'level': getattr(profile, 'level', 1),
            'rank': getattr(profile, 'rank', 'E-Rank'),
            'streak': getattr(profile, 'streak', 0),
            'last_active': getattr(profile, 'last_active', ''),
            'last_mission_check': getattr(profile, 'last_mission_check', ''),
            'weekly_xp': getattr(profile, 'weekly_xp', 0),
        })
