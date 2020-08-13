from django.shortcuts import render
from adventurer.models import Adventurer
from campaigns.models import Campaign
from django.http import HttpResponse, HttpResponseRedirect, Http404

def profile(request, user_id):
    if(request.user.is_anonymous):
        raise Http404()
    context = { }
    context['campaigns'] = Campaign.objects.filter(owner=request.user)
    return render(request, 'adventurer/profile.html', context)

def settings(request):
    if(request.user.is_anonymous):
        raise Http404()
    context = {}
    return render(request, 'adventurer/profile.html', context)
