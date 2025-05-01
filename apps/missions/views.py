from rest_framework import generics
from .models import Mission
from .serializers import MissionSerializer, CompleteMissionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from .models import DailyUserMission

class DailyMissionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()
        missions = DailyUserMission.objects.filter(user=request.user, assigned_date=today).select_related('mission')
        mission_list = [dm.mission for dm in missions]
        return Response(MissionSerializer(mission_list, many=True).data)

class ActiveMissionList(generics.ListAPIView):
    serializer_class = MissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Mission.objects.filter(is_active=True)

class CompleteMissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CompleteMissionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        return Response(result)

class MissionList(APIView):
    def get(self, request):
        missions = [{"id": 1, "name": "Mission 1"}, {"id": 2, "name": "Mission 2"}]
        return Response(missions)