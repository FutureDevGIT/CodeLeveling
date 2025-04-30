from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UserItem
from .serializers import UserItemSerializer

class InventoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = UserItem.objects.filter(user=request.user)
        serializer = UserItemSerializer(items, many=True)
        return Response(serializer.data)

class UseItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        item_type = request.data.get('item_type')  # XP, REVIVE, REROLL
        result = use_item(request.user, item_type)
        return Response(result)