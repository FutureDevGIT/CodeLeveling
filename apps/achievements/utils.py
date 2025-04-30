from .models import Badge, UserBadge

def evaluate_badges(user):
    profile = user.userprofile

    conditions = {
        "100_xp": profile.xp >= 100,
        "1000_xp": profile.xp >= 1000,
        "7_day_streak": profile.streak >= 7,
        "elite_clear": user.userelitequest_set.filter(completed=True).exists(),
    }

    for badge in Badge.objects.all():
        if conditions.get(badge.condition) and not UserBadge.objects.filter(user=user, badge=badge).exists():
            UserBadge.objects.create(user=user, badge=badge)
            # Optionally: trigger announcement here