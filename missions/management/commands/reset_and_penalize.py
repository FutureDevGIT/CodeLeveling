from django.core.management.base import BaseCommand
from missions.models import DailyUserMission
from users.models import UserProfile
from django.utils.timezone import now, timedelta

class Command(BaseCommand):
    help = "Resets missions daily and penalizes users for uncompleted ones."

    def handle(self, *args, **kwargs):
        today = now().date()
        yesterday = today - timedelta(days=1)

        profiles = UserProfile.objects.all()

        for profile in profiles:
            user = profile.user

            # Skip if already checked today
            if profile.last_mission_check == today:
                continue

            # Check yesterday's daily missions
            incomplete_missions = DailyUserMission.objects.filter(
                user=user,
                assigned_date=yesterday,
                completed=False
            ).count()

            if incomplete_missions > 0:
                # Apply punishment
                xp_loss = 20 * incomplete_missions
                profile.xp = max(0, profile.xp - xp_loss)
                profile.streak = 0  # Reset streak
                print(f"{user.username} failed {incomplete_missions} missions. Lost {xp_loss} XP.")

            # Assign 3 random new missions for today
            from random import sample
            from missions.models import Mission
            active_missions = list(Mission.objects.filter(is_active=True))
            new_missions = sample(active_missions, k=3)

            for mission in new_missions:
                DailyUserMission.objects.create(user=user, mission=mission, assigned_date=today)

            profile.last_mission_check = today
            profile.save()
