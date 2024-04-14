from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from userevents.models import Event, LikedEvents


# Authentications Views.

# Sign up / User Registration View
@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            # Retrieving the data from the request
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            
            if not email or not password: # Empty validations for email and password
                return JsonResponse({"error": "Email and password are required"}, status=400)
            
            # Registering the user
            user = User.objects.create_user(email, email, password)
            user.save()
            print("Registered user ")
            return JsonResponse({"message": "User registered successfully "}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid json data received"}, status=400)
        except Exception as e:
            print("Error occurred during user registration: ", e)
            return JsonResponse({"error": "An error occurred while registering user"}, status=500)
        
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)


# log in view 
@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            if not email or not password:
                return JsonResponse({"error": "Email and password are required"}, status=400)
            
            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({"message": "User logged in successfully", "email": user.email, "id": user.id}, status=200)
            else:
                return JsonResponse({"error": "Invalid email or password"}, status=400)

        except Exception as e:
            print("Error occurred while user login:", e)
            return JsonResponse({"error": "An error occurred while logging in"}, status=500)

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)


# Sign out view
@csrf_exempt
def logOutUser(request):
    try:
        if request.user.is_authenticated and not request.user.is_anonymous:
            logout(request)
            return JsonResponse({"message": "User logged out successfully"}, status=200)
        else:
            return JsonResponse({"error": "User is not logged in"}, status=400)
    except Exception as e:
        print("Could not log out user due to:", e)
        return JsonResponse({"error": "User logout failed"}, status=500)



#Create Event
@csrf_exempt
def create_event(request):
    if request.user.is_authenticated and not request.user.is_anonymous and request.method == 'POST':
        try:
            # Extract form data
            event_name = request.POST.get("event_name")
            date = request.POST.get("date")
            time = request.POST.get("time")
            location = request.POST.get("location")

            # Handle file upload
            image = request.FILES.get("image")

            # Validate required fields
            if not event_name or not date or not time or not location:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # Create event object
            event = Event(
                event_name=event_name,
                date=date,
                time=time,
                location=location,
                image=image,
                user_id=request.user
            )
            # Save event to database
            event.save()

            # Return success response
            return JsonResponse({"message": "Event created successfully"}, status=201)

        except Exception as e:
            print("Error occurred during event creation:", e)
            return JsonResponse({"error": "An error occurred while creating the event"}, status=500)

    return JsonResponse({"error": "Only POST requests with logged in users are allowed"}, status=405)


# View all events
@csrf_exempt
def ViewAllEvents(request):
    if request.method == 'GET':
        try:
            data = Event.objects.all()
            events = []
            for event in data:
                event_data = {
                    "event_name": event.event_name,
                    "date": event.date,
                    "time": event.time,
                    "location": event.location,
                    "image": event.image.url if event.image else None,
                    "liked": event.isLiked
                }
                events.append(event_data)

            if events:
                return JsonResponse({'message': "Listed Events", 'events': events})
            else:
                return JsonResponse({'message': "No Events Registered by any user"})
        except Exception as e:
            print("Could not retrieve data due to:", e)
            return JsonResponse({'message': "Could not retrieve events"}, status=500)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)


# View logged in user Events
@csrf_exempt
def loggedInUserEvents(request):
    if request.method == 'GET':
        try:
            if request.user.is_authenticated and not request.user.is_anonymous:
                data = Event.objects.filter(user_id_id=request.user.id)
                events = []
                for event in data:
                    event_data = {
                        "event_name": event.event_name,
                        "date": event.date,
                        "time": event.time,
                        "location": event.location,
                        "image": event.image.url if event.image else None,
                        "isLiked": event.isLiked
                    }
                    events.append(event_data)

                if events:
                    return JsonResponse({'message': "User Events", 'events': events}, status=200)
                else:
                    return JsonResponse({'message': "No Events"}, status=404)
                
            else:
                return JsonResponse({'message': "User shall be logged in"}, status=400)

        except Exception as e:
            print("Could not get user events due to ", e)
            return JsonResponse({'message': "An error occurred while viewing user events"}, status=500)
    else:
        return JsonResponse({'message': 'Only GET requests are permitted'}, status=400)


#  Stored User liked Events in the db
@csrf_exempt
def likedEventsByUser(request):
    if request.user.is_authenticated and not request.user.is_anonymous and request.method == 'POST':
        eventName = request.POST.get('eventName')

        if not eventName:
            return JsonResponse({'message': "Kindly provide an event name"}, status=400)

        # Like/unlike an event
        try:
            event = Event.objects.get(event_name=eventName)
        except Event.DoesNotExist:
            return JsonResponse({'message': 'Event does not exist'}, status=404)

        event.isLiked = not event.isLiked
        event.save()

        # Get or create the LikedEvents object for the user
        user = request.user
        liked_event, _ = LikedEvents.objects.get_or_create(user=user)

        if event.isLiked:
            liked_event.likedEvents.add(event)
        else:
            # Unlike the event
            liked_event.likedEvents.remove(event)

            # If the likedEvents list becomes empty, delete the LikedEvents object
            if not liked_event.likedEvents.exists():
                liked_event.delete()

        return JsonResponse({'message': 'Event liked'}, status=201)

    else:
        return JsonResponse({'message': "Only POST requests with logged in users are permitted"}, status=403)
