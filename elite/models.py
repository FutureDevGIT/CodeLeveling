from django.db import models
from django.contrib.auth.models import User

class EliteQuest(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    xp_reward = models.IntegerField(default=500)
    required_rank = models.CharField(max_length=20, default="B-Rank")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"[Elite Quest] {self.title}"

class UserEliteQuest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    elite_quest = models.ForeignKey(EliteQuest, on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.elite_quest.title}"