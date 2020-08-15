from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout as django_logout
from adventurer.models import Adventurer

def page_not_found(request, exception):
    context = {}
    return render(request, 'landing/404.html', context)

def home(request):
    if(request.user.is_authenticated):
        Adventurer.objects.get_or_create(pk=request.user.pk)
        return HttpResponseRedirect('dash')
    context = {}
    return render(request, 'landing/home.html', context)

def landing(request):
    context = {}
    if(request.method == "POST"):
        return render(request, 'landing/landing.html', context)
    return render(request, 'landing/home.html', context)

def login(request):
    context = {}
    if(request.method == "POST"):
        return render(request, 'landing/login.html', context)
    return render(request, 'landing/home.html', context)

def register(request):
    context = {}
    if(request.method == "POST"):
        return render(request, 'landing/register.html', context)
    return render(request, 'landing/home.html', context)

def logout(request):
    django_logout(request)
    return HttpResponseRedirect('/')
