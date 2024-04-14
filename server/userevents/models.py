from django.db import models
from django.contrib.auth.models import User

# Model for individual events
class Event(models.Model):
    event_name = models.CharField(max_length=100, primary_key=True)  # Unique identifier for the event
    date = models.DateField()  # Date of the event
    time = models.TimeField()  # Time of the event
    location = models.CharField(max_length=30)  # Location of the event
    image = models.FileField(upload_to="events", default="", null=True, max_length=250)  # Image associated with the event
    isLiked = models.BooleanField(default=False)  # Indicates whether the event is liked by users
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, to_field="id")  # Reference to the user who created the event

    def __str__(self):
        return self.event_name  # String representation of the event object


# Model for storing liked events by users
class LikedEvents(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Reference to the user
    likedEvents = models.ManyToManyField(Event)  # Many-to-many relationship with Event model to store liked events

    def __str__(self):
        return self.user.username  # String representation of the liked events object
