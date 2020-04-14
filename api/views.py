from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from campaigns.models import Campaign, Tag
import json

#@csrf_exemp -> REMEMBER

def user_register(request):
    if request.is_ajax():
        username = request.POST.get("username")
        password = request.POST.get("password")
        check_pass = request.POST.get("check_pass")

        if(User.objects.all().filter(username=username).exists()):
            return HttpResponse(json.dumps("duplicate username"), content_type="application/json")
        if(not (username != "" and password != "")):
            return HttpResponse(json.dumps("username or pass field empty"), content_type="application/json")
        print(password, check_pass)
        if(password != check_pass):
            return HttpResponse(json.dumps("passwords don't match"), content_type="application/json")
        
        user = User.objects.create_user(username, "", password)
        auth_user = authenticate(username=username, password=password)
        login(request, auth_user)

        return HttpResponse(json.dumps("logged in"), content_type="application/json")
    else:
        return Http404


def user_login(request):
    if request.is_ajax():
        user = authenticate(username=request.POST.get("username"), password=request.POST.get("password"))
        if user is not None:
            login(request, user)
            return HttpResponse(json.dumps("logged in"), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404


def new_campaign(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            c = Campaign()
            c.user = request.user
            c.title = request.POST.get("title")
            c.description = request.POST.get("description")
            c.save()
            return HttpResponse(json.dumps(str(c.id)), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404
