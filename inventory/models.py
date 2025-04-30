from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    ITEM_TYPES = [
        ('XP', 'XP Boost'),
        ('REVIVE', 'Revive Missed Day'),
        ('REROLL', 'Reroll Daily Missions'),
    ]

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=ITEM_TYPES)
    description = models.TextField()
    value = models.IntegerField()  # XP amount or effect strength
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class UserItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - {self.item.name} x{self.quantity}"
