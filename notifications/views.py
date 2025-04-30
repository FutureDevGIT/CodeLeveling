from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserAnnouncement

class AnnouncementView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        announcements = UserAnnouncement.objects.filter(user=request.user, seen=False)
        data = [
            {
                "id": ann.id,
                "title": ann.announcement.title,
                "message": ann.announcement.message,
                "created_at": ann.announcement.created_at,
            }
            for ann in announcements
        ]
        return Response(data)

    def post(self, request):
        # mark as seen
        ids = request.data.get("seen_ids", [])
        UserAnnouncement.objects.filter(id__in=ids, user=request.user).update(seen=True)
        return Response({"status": "seen updated"})