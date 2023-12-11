from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Message
from .serializer import MessageSerializer


class MessageViewSet(ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
