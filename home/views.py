from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout as django_logout

def page_not_found(request, exception):
    context = {}
    return render(request, 'home/404.html', context)

def index(request):
    if(request.user.is_authenticated):
        context = {}
        return HttpResponseRedirect('adventurer/' + request.user.username)
    else:
        context = {}
        return render(request, 'home/home.html', context)

def login(request):
    context = {}
    return render(request, 'home/login.html', context)

def logout(request):
    django_logout(request)
    return HttpResponseRedirect('/')
