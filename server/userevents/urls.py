from django.urls import path
from userevents import views
urlpatterns = [
    # authentication related urls
    path("register",views.register,name="register"),
    path("login",views.loginUser,name="login"),
    path("logout",views.logOutUser,name="logout"),

    # events related urls
    path("create-event",views.create_event,name="registerevent"),
    path("view-events",views.ViewAllEvents,name="viewEvents"),
    path("user-events",views.loggedInUserEvents,name="viewEvents"),
    path("like-events",views.likedEventsByUser,name="likedEvents"),
]
