from django.db import models


class Room(models.Model):
    room = models.CharField(max_length=120, null=True, blank=True)
    slug = models.SlugField(unique=True)

    # Знаю что логичнее было бы сюда запихнуть name, но на данный момент этого не требуется
    def __str__(self):
        return self.slug


class Message(models.Model):
    username = models.CharField(max_length=120, null=True, blank=True)
    message = models.CharField(max_length=300)
    date_creation = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return self.message
