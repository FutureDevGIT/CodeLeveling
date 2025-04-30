from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from apps.missions.models import UserMission, Mission
from apps.missions.serializers import MissionSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    completed_missions = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('user', 'level', 'xp', 'rank', 'streak', 'last_active', 'completed_missions')

    def get_completed_missions(self, obj):
        completed = UserMission.objects.filter(user=obj.user).select_related('mission')
        return MissionSerializer([cm.mission for cm in completed], many=True).data

