import json

from asgiref.sync import sync_to_async
from attr import attr
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.forms.models import model_to_dict

from .models import Message, Room


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        self.create_room = await database_sync_to_async(Room.objects.get_or_create)(slug=self.room_name)
        room_messages = await self.get_messages()

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Получаем сообщения для комнаты при коннекте если они существуют
        await self.send(json.dumps({
            'messages': [
                {
                    'id': i['id'],
                    'message': i['message'],
                    'date_creation': i['date_creation'].now().strftime("%Y-%m-%d %H:%M:%S")
                }
                for i in room_messages
            ]
        }, default=str))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Метод получения всех сообщений чата
    @database_sync_to_async
    def get_messages(self):
        messages = Message.objects.filter(room__slug=self.room_name).values('id', 'message', 'date_creation')
        msg = []
        for message in messages:
            msg.append(message)
        return msg

    @database_sync_to_async
    def create_message(self, message, room):
        return Message.objects.create(message=message, room=room)

    @database_sync_to_async
    def get_room(self):
        return Room.objects.get(slug=self.room_name)

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        message = data['message']
        room = await self.get_room()
        save_message = await self.create_message(message, room=room)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': {
                    'id': save_message.id,
                    'message': save_message.message,
                    'date_creation': f'{save_message.date_creation.now().strftime("%Y-%m-%d %H:%M:%S")}'
                }
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
