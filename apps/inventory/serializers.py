from rest_framework import serializers
from .models import UserItem

class UserItemSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='item.name', read_only=True)
    item_type = serializers.CharField(source='item.type', read_only=True)
    description = serializers.CharField(source='item.description', read_only=True)

    class Meta:
        model = UserItem
        fields = ['id', 'item_name', 'item_type', 'description', 'quantity']