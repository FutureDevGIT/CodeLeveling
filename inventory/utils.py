from users.utils import level_up
from missions.models import DailyUserMission
from django.utils.timezone import now, timedelta

def use_item(user, item_type):
    profile = user.userprofile
    today = now().date()

    user_items = UserItem.objects.filter(user=user, item__type=item_type, quantity__gt=0)
    if not user_items.exists():
        return {"error": f"No '{item_type}' item found."}

    user_item = user_items.first()
    effect_value = user_item.item.value

    if item_type == 'XP':
        profile.xp += effect_value
        profile.level, profile.xp = level_up(profile.level, profile.xp)
        profile.save()

    elif item_type == 'REVIVE':
        missed_day = today - timedelta(days=1)
        missed_missions = DailyUserMission.objects.filter(user=user, assigned_date=missed_day, completed=False)
        if missed_missions.exists():
            missed_missions.update(completed=True)
            profile.streak += 1
            profile.save()
        else:
            return {"error": "No missions missed yesterday to revive."}

    elif item_type == 'REROLL':
        # Clear today’s missions and reassign
        DailyUserMission.objects.filter(user=user, assigned_date=today).delete()
        from missions.utils import assign_daily_missions
        assign_daily_missions(user)

    # Consume item
    user_item.quantity -= 1
    user_item.save()

    return {"success": f"{item_type} item used successfully."}
