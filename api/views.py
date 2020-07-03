from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from campaigns.models import Campaign, Card, Tag, Note
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

#Campaign
def new_campaign(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            c = Campaign()
            c.creator = request.user
            c.owner = request.user
            c.title = request.POST.get("title")
            c.description = request.POST.get("description")
            c.private = request.POST.get("private")
            if(request.POST.get("hasImg") == "true"):
                c.img = request.FILES['img']
            c.save()
            return HttpResponse(json.dumps(str(c.id)), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404

def edit_campaign(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            print("//Todo: fix me")
    else:
        return Http404


def delete_campaign(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            for card in Campaign.objects.get(id=request.POST.get("campaignid")).cards.all():
                for note in Card.objects.get(id=card.id).notes.all():
                    Note.objects.get(id=note.id).delete()
                Card.objects.get(id=card.id).img.delete()
                Card.objects.get(id=card.id).delete()
            for tag in Campaign.objects.get(id=request.POST.get("campaignid")).tags.all():
                Tag.objects.get(id=tag.id).delete()
            Campaign.objects.get(id=request.POST.get("campaignid")).img.delete()
            Campaign.objects.get(id=request.POST.get("campaignid")).delete()

            return HttpResponse(json.dumps("deleted"), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404

#Card
def new_card(request):
    if request.is_ajax():
        c = Campaign.objects.get(pk=request.POST.get("parent"))
        if(request.POST.get("author") == request.user.username and c.owner.username == request.user.username):
            card = Card()
            card.name = request.POST.get("title")
            card.description = request.POST.get("description")
            if(request.POST.get("hasImg") == "true"):
                card.img = request.FILES['img']
            card.save()
            c.cards.add(card)
            return HttpResponse(json.dumps(str(c.id)), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404

def edit_card(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):
            print("//Todo: fix me")
    else:
        return Http404

def delete_card(request):
    if request.is_ajax():
        if(request.POST.get("author") == request.user.username):

            Campaign.objects.get(id=request.POST.get("id")).img.delete()
            Campaign.objects.get(id=request.POST.filter("id")).delete()

            return HttpResponse(json.dumps("deleted"), content_type="application/json")
        else:
            return HttpResponse(json.dumps("invalid credentials"), content_type="application/json")
    else:
        return Http404

def new_identifier(request):
    if request.is_ajax():
        c = Campaign.objects.get(pk=request.POST.get("parent"))
        if(request.POST.get("author") == request.user.username and c.owner.username == request.user.username):
            card = Card.objects.get(pk=request.POST.get("cardid"))
            note = Note()
            note.note = request.POST.get("identifier")
            note.private = request.POST.get("private")
            note.save()
            card.identifiers.add(note)
            return HttpResponse(json.dumps("saved"), content_type="application/json")
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