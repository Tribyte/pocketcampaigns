from django.contrib.auth.models import User
from adventurer.models import Adventurer
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def user_register(request):
    username = request.data["username"]
    password = request.data["password"]
    check_pass = request.data["check_pass"]

    if(User.objects.all().filter(username=username).exists()): return Response({'data': 'duplicate username'})
    if(username == "" or password == ""): return Response({'data': 'username or pass field empty'})
    if(password != check_pass): return Response({'data': 'passwords don\'t match'})

    user = User.objects.create_user(username, "", password)
    auth_user = authenticate(username=username, password=password)
    Token.objects.create(user=user)
    adventurer = Adventurer()
    adventurer.pk = user.pk
    adventurer.save()
    login(request, auth_user)

    return Response({'data': 'success'})


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def user_login(request):
    user = authenticate(username=request.data["username"], password=request.data["password"])
    if user is not None:
        Adventurer.objects.get_or_create(pk=user.pk)
        login(request, user)
        return Response({'data': 'success'})
    else:
        return Response({'data': 'Error: Invalid Credentials'})
