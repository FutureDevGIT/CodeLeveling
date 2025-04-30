from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserBadge

class UserBadgesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        badges = UserBadge.objects.filter(user=request.user)
        return Response([
            {
                "name": b.badge.name,
                "description": b.badge.description,
                "icon": b.badge.icon,
                "earned_at": b.earned_at
            } for b in badges
        ])