from django.urls import include, path
from rest_framework import routers
from .views import MessageViewSet

router = routers.DefaultRouter()
router.register(r'user-messages', MessageViewSet, basename="messages")

urlpatterns = [
    path('api/', include(router.urls)),
]