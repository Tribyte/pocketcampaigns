from adventurer.models import Party
from api.permissions import IsOwner, IsSuperUser, IsUser
from .serializers import PartySerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

class PartyViewSet(viewsets.ViewSet):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]

    def list(self, request):
        queryset = Party.objects.all()
        serializer = PartySerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        return Response({'Test': 'Here'})

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [IsSuperUser, ]
        elif self.action == 'retrieve':
            self.permission_classes = [IsOwner, ]
        elif self.action == 'create':
            self.permission_classes = [IsUser, ]
        return super(self.__class__, self).get_permissions()
