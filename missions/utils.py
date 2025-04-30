import random
from django.utils.timezone import now
from .models import Mission, DailyUserMission

def assign_daily_missions(user):
    today = now().date()

    # If missions already assigned today, skip
    if DailyUserMission.objects.filter(user=user, assigned_date=today).exists():
        return

    missions = list(Mission.objects.filter(is_active=True))
    if len(missions) < 3:
        raise Exception("Not enough missions available to assign.")

    daily = random.sample(missions, k=3)

    for mission in daily:
        DailyUserMission.objects.create(user=user, mission=mission, assigned_date=today)

    # Update mission check date
    profile = user.userprofile
    profile.last_mission_check = today
    profile.save()
