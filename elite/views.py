from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserEliteQuest
from users.utils import level_up

class AcceptEliteQuestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quest_id):
        uq = UserEliteQuest.objects.filter(user=request.user, elite_quest_id=quest_id).first()
        if not uq or uq.accepted:
            return Response({"error": "Cannot accept this quest."})
        uq.accepted = True
        uq.save()
        return Response({"success": "Elite quest accepted!"})

class CompleteEliteQuestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quest_id):
        uq = UserEliteQuest.objects.filter(user=request.user, elite_quest_id=quest_id, accepted=True).first()
        if not uq or uq.completed:
            return Response({"error": "Cannot complete this quest."})

        # Reward XP
        profile = request.user.userprofile
        profile.xp += uq.elite_quest.xp_reward
        profile.level, profile.xp = level_up(profile.level, profile.xp)
        profile.save()

        uq.completed = True
        uq.save()

        return Response({"success": "Elite quest completed!", "level": profile.level})
