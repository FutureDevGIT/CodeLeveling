from django.contrib.auth.models import User
from django.db import models
from users.utils import get_user_rank

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)
    rank = models.CharField(max_length=20, default="E-Rank")
    streak = models.IntegerField(default=0)
    last_active = models.DateField(null=True, blank=True)
    last_mission_check = models.DateField(null=True, blank=True)
    weekly_xp = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        self.rank = get_user_rank(self.level)
        super().save(*args, **kwargs)

# weekly task
def reset_weekly_xp():
    UserProfile.objects.all().update(weekly_xp=0)