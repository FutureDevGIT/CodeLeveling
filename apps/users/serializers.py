from rest_framework import serializers
from django.contrib.auth.models import User
from apps.users.models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = UserProfile
        fields = [
            'username',
            'email',
            'level',
            'xp',
            'rank',
            'streak',
            'last_active',
            'last_mission_check',
            'weekly_xp'
        ]