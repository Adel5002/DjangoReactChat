from django.db import models


class Message(models.Model):
    username = models.CharField(max_length=120, null=True, blank=True)
    user_message = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
