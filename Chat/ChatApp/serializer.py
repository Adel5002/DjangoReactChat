from .models import Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'room', 'username', 'message', 'date_creation']
        read_only_fields = ['id', 'date_creation']

