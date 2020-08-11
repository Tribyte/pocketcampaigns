from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout as django_logout

def page_not_found(request, exception):
    context = {}
    return render(request, 'home/404.html', context)

def home(request):
    if(request.user.is_authenticated):
        return HttpResponseRedirect('adventurer/' + request.user.username)
    context = {}
    return render(request, 'home/home.html', context)

def logout(request):
    django_logout(request)
    return HttpResponseRedirect('/')