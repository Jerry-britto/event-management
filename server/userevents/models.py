from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    event_name = models.CharField(max_length=100,primary_key=True)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=30)
    image = models.FileField(upload_to="events",default="",null=True,max_length=250)
    isLiked = models.BooleanField(default=False)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,to_field="id")

    def __str__(self):
        return self.event_name
    

class LikedEvents(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    likedEvents = models.ManyToManyField(Event)

    def __str__(self):
        return self.user.username
    
    