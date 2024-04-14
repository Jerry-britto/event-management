from django.contrib import admin
from userevents.models import Event
from userevents.models import LikedEvents
# Register your models here.
admin.site.register(Event)
admin.site.register(LikedEvents)

