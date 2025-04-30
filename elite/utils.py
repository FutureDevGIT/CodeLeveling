from django.utils.timezone import now, timedelta
from users.utils import get_user_rank
from .models import EliteQuest, UserEliteQuest

def assign_elite_quests(user):
    if get_user_rank(user.userprofile.level) in ['B-Rank', 'A-Rank', 'S-Rank', 'SS-Rank', 'SSS-Rank']:
        active_quests = EliteQuest.objects.filter(is_active=True, expires_at__gt=now())
        for quest in active_quests:
            already_assigned = UserEliteQuest.objects.filter(user=user, elite_quest=quest).exists()
            if not already_assigned:
                UserEliteQuest.objects.create(user=user, elite_quest=quest)
