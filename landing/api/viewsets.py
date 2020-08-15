from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
import json

class AuthViewSet(viewsets.ViewSet):
    parser_classes = [MultiPartParser, FormParser, JSONParser, ]

    @action(detail=True, methods=['post'])
    def login(self, request):
        user = authenticate(username=request.data["username"], password=request.data["password"])
        if user is not None:
            login(request, user)
            return Response({'data': 'success'})
        else:
            return Response({'Error': 'Invalid Credentials'})

