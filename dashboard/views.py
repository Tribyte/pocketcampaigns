from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout as django_logout
from campaigns.models import Campaign

def dash(request):
    context = {}
    context['campaigns'] = Campaign.objects.filter(owner=request.user.pk)
    return render(request, 'dashboard/dash.html', context)
