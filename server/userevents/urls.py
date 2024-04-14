from django.urls import path
from userevents import views

urlpatterns = [
    # Authentication related URLs
    path("register", views.register, name="register"),  # URL for user registration
    path("login", views.loginUser, name="login"),  # URL for user login
    path("logout", views.logOutUser, name="logout"),  # URL for user logout

    # Events related URLs
    path("create-event", views.create_event, name="registerevent"),  # URL for creating a new event
    path("view-events", views.ViewAllEvents, name="viewEvents"),  # URL for viewing all events
    path("user-events", views.loggedInUserEvents, name="viewEvents"),  # URL for viewing events of logged-in user
    path("like-events", views.likedEventsByUser, name="likedEvents"),  # URL for liking/unliking events
]
