from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(default=now)
    level_requirement = models.IntegerField(default=0)  # optional targeting

    def __str__(self):
        return f"📣 {self.title}"


class UserAnnouncement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE)
    seen = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.announcement.title}"
