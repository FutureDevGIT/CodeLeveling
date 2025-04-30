from django.urls import path
from .views import InventoryView, UseItemView

urlpatterns = [
    path('', InventoryView.as_view(), name='inventory'),
    path('use/', UseItemView.as_view(), name='use-item'),
]