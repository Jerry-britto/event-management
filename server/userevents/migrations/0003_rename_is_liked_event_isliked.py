# Generated by Django 5.0.4 on 2024-04-14 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userevents', '0002_rename_events_event'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='is_liked',
            new_name='isLiked',
        ),
    ]