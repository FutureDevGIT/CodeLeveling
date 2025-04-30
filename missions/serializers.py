from .models import Mission, UserMission, DailyUserMission
from users.models import UserProfile
from users.utils import level_up
from rest_framework import serializers
from django.utils.timezone import now
from users.constants import REWARDS

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = '__all__'

class CompleteMissionSerializer(serializers.Serializer):
    mission_id = serializers.IntegerField()

    def validate(self, data):
        user = self.context['request'].user
        mission_id = data['mission_id']

        if UserMission.objects.filter(user=user, mission_id=mission_id).exists():
            raise serializers.ValidationError("Mission already completed.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        mission_id = validated_data['mission_id']
        today = now().date()

        # Log mission
        mission = Mission.objects.get(id=mission_id)
        UserMission.objects.create(user=user, mission=mission)

        # Update XP and Level
        profile = user.userprofile
        profile.xp += mission.xp_reward
        profile.level, profile.xp = level_up(profile.level, profile.xp)
        reward = REWARDS.get(profile.level)
        if reward:
            notify_user(user, f"You unlocked: {reward}")
        profile.last_active = today
        profile.streak += 1
        profile.save()

        # Mark today's DailyUserMission as completed (if exists)
        try:
            daily_mission = DailyUserMission.objects.get(user=user, mission=mission, assigned_date=today)
            daily_mission.completed = True
            daily_mission.save()
        except DailyUserMission.DoesNotExist:
            pass  # Not a daily mission — maybe it's a bonus

        return {
            "message": "Mission completed!",
            "new_level": profile.level,
            "current_xp": profile.xp
        }
