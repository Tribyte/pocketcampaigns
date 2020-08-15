from campaigns.models import Campaign
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import parser_classes, api_view
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def element(request):
    if("id" not in request.data): return Response({'error': 'missing \'id\' in form data'})
    context = {}
    context["campaign"] = Campaign.objects.get(pk=request.data["id"])

    if(context["campaign"].owner.pk != request.user.pk): return Response({'error': 'invalid credentials'})
    return render(request, 'navigation/sidebar/basic/template/element.html', context)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def sub_element(request):
    if("id" not in request.data): return Response({'error': 'missing \'id\' in form data'})
    if("name" not in request.data): return Response({'error': 'missing \'name\' in form data'})

    context = {
        "id": request.data["id"],
        "name": request.data["name"],
    }

    return render(request, 'navigation/sidebar/basic/template/sub-element.html', context)
