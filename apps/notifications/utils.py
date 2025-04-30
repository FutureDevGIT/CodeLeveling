from .models import Announcement, UserAnnouncement

def push_announcement_to_user(user):
    new_announcements = Announcement.objects.filter(
        level_requirement__lte=user.userprofile.level
    )
    for ann in new_announcements:
        if not UserAnnouncement.objects.filter(user=user, announcement=ann).exists():
            UserAnnouncement.objects.create(user=user, announcement=ann)