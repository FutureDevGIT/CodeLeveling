from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Mission(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    xp_reward = models.IntegerField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class UserMission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'mission']

class DailyUserMission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE)
    assigned_date = models.DateField(default=now)
    completed = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'mission', 'assigned_date']

    def __str__(self):
        return f"{self.user.username} - {self.mission.title} ({self.assigned_date})"