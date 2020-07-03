from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from .models import Campaign, Tag

def campaigns(request):
    if(request.user.is_anonymous):
        raise Http404()
    context = {}
    context['campaigns'] = Campaign.objects.filter(owner=request.user)
    return render(request, 'campaigns/campaigns.html', context)

def campaign(request, campaign_id):
    context = {}
    context['campaign'] = Campaign.objects.get(pk=campaign_id)
    return render(request, 'campaigns/campaign.html', context)

def card(request, campaign_id, card_id, user_id=-1):
    context = {}
    context['campaign'] = Campaign.objects.get(pk=campaign_id)
    context['card'] = Campaign.objects.get(pk=campaign_id).cards.get(pk=card_id)
    return render(request, 'campaigns/card.html', context)
