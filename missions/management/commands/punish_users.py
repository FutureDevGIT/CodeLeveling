from django.core.management.base import BaseCommand
from django.utils.timezone import now, timedelta
from missions.models import DailyUserMission
from users.models import UserProfile

class Command(BaseCommand):
    help = "Applies punishment to users who failed to complete their daily missions."

    def handle(self, *args, **kwargs):
        today = now().date()
        yesterday = today - timedelta(days=1)

        profiles = UserProfile.objects.all()
        for profile in profiles:
            user = profile.user

            # Get yesterday's missions
            missions = DailyUserMission.objects.filter(user=user, assigned_date=yesterday)

            if not missions.exists():
                continue  # Skip if no missions assigned yesterday

            incomplete = missions.filter(completed=False).count()
            if incomplete > 0:
                xp_penalty = 20 * incomplete
                old_xp = profile.xp
                profile.xp = max(0, profile.xp - xp_penalty)
                profile.streak = 0
                profile.save()

                self.stdout.write(
                    self.style.WARNING(
                        f"{user.username} failed {incomplete} missions. -{xp_penalty} XP (from {old_xp} to {profile.xp}) | Streak reset."
                    )
                )
            else:
                self.stdout.write(self.style.SUCCESS(f"{user.username} completed all missions. No punishment."))
