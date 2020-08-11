from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from campaigns.models import Campaign, Card, Tag, Note
from rest_framework.response import Response
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


#Tag
def new_tag(request):
    if request.is_ajax():
        c = Campaign.objects.get(pk=request.POST.get("parent"))
        if(request.POST.get("author") == request.user.username and c.owner.username == request.user.username):
            tag = Tag()
            tag.tag = request.POST.get("tag")
            tag.save()
            try:
                card = Card.objects.get(pk=request.POST.get("cardid"))
                card.tags.add(tag)
            except:
                pass
            c.tags.add(tag)
            return HttpResponse(json.dumps(str(tag.id) + ":" + tag.tag), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404

def edit_tag(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            print("//Todo: fix me")
    else:
        return Http404


def delete_tag(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):

            Campaign.objects.get(id=request.POST.get("id")).img.delete()
            Campaign.objects.get(id=request.POST.filter("id")).delete()

            return HttpResponse(json.dumps("deleted"), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404
