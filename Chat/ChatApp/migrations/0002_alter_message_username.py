# Generated by Django 4.2.7 on 2023-12-03 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ChatApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='username',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
