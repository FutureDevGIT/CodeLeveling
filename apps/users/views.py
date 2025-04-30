from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from apps.missions.utils import assign_daily_missions

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        UserProfile.objects.create(user=user)

        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }, status=201)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.userprofile

        # Assign missions on login/profile view
        assign_daily_missions(request.user)

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)