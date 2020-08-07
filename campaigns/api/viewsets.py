from campaigns.models import Campaign, Card, Tag, Note
from campaigns.forms import CampaignForm, CardForm, NoteForm, TagForm
from api.permissions import IsOwner, IsSuperUser, IsUser
from .serializers import CampaginSerializer, CardSerializer, NoteSerializer, TagSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser
import json


class CampaignViewSet(viewsets.ViewSet):
    authentication_classes = [ SessionAuthentication, TokenAuthentication, ]
    parser_classes = [ MultiPartParser, FormParser, JSONParser, ]

    def list(self, request):
        queryset = Campaign.objects.filter(owner=request.user.id)
        serializer = CampaginSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        campaign = Campaign.objects.get(pk=pk)
        if(campaign.owner != request.user): return Response({'Error': 'Authentication error'})
        queryset = campaign
        serializer = CampaginSerializer(queryset)
        return Response(serializer.data)

    def create(self, request):
        form = CampaignForm(request.data)
        if(form.is_valid()):
            new_campaign = form.save(commit=False)
            new_campaign.creator = request.user
            new_campaign.owner = request.user
            if(request.FILES): new_campaign.img = request.data['img']
            new_campaign.save()
            serializer = CampaginSerializer(new_campaign)
            return Response(serializer.data)
        return Response({'Test': 'False Broke'})

    def update(self, request, pk=None):
        campaign = Campaign.objects.get(pk=pk)
        if(campaign.owner != request.user): return Response({'Error': 'Authentication error'})
        form = CampaignForm(request.data, instance=campaign)
        if(form.is_valid()):
            campaign = form.save(commit=False)
            if(request.FILES): campaign.img = request.data['img']
            campaign.save()
            serializer = CampaginSerializer(campaign)
            return Response(serializer.data)
        return Response({'Test': 'False Broke'})

    def destroy(self, request, pk=None):
        campaign = Campaign.objects.get(pk=pk)
        if(campaign.owner != request.user): return Response({'Error': 'Authentication error'})
        for card in campaign.cards.all():
            for note in Card.objects.get(id=card.id).notes.all():
                Note.objects.get(id=note.id).delete()
            Card.objects.get(id=card.id).img.delete()
            Card.objects.get(id=card.id).delete()
        for tag in Campaign.objects.get(pk=pk).tags.all():
            Tag.objects.get(id=tag.id).delete()
        Campaign.objects.get(pk=pk).img.delete()
        Campaign.objects.get(pk=pk).delete()
        return Response({'Status': 'Deleted Campaign ' + str(pk)})

    def get_permissions(self):
        if self.action == 'list': self.permission_classes = [IsUser, ]
        elif self.action == 'retrieve': self.permission_classes = [IsOwner, IsUser, ]
        elif self.action == 'create': self.permission_classes = [IsUser, ]
        elif self.action == 'update': self.permission_classes = [IsOwner, IsUser, ]
        elif self.action == 'delete': self.permission_classes = [IsOwner, IsUser, ]
        return super(self.__class__, self).get_permissions()


class CardViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]
    parser_classes = [MultiPartParser, FormParser, JSONParser, ]

    def list(self, request):
        queryset = None
        campaigns = Campaign.objects.filter(owner=request.user.id)
        for campaign in campaigns:
            if(queryset == None):
                queryset = campaign.cards.all()
                continue
            queryset += campaign.cards.all()
        serializer = CardSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Card.objects.get(pk=pk)
        serializer = CardSerializer(queryset)
        return Response(serializer.data)

    def create(self, request):
        if('campaign' not in request.data): return Response({'Error': 'Missing "campaign" in form data'})
        campaign = Campaign.objects.get(pk=request.data['campaign'])
        if(campaign.owner != request.user): return Response({'Error': 'Authentication error'})
        form = CardForm(request.data)
        if(form.is_valid()):
            new_card = form.save(commit=False)
            if(request.FILES): new_card.img = request.data['img']
            new_card.save()
            campaign.cards.add(new_card)
            serializer = CardSerializer(new_card)
            return Response(serializer.data)
        return Response({'Test': 'False Broke'})

    def update(self, request, pk=None):
        if('campaign' not in request.data): return Response({'Error': 'Missing "campaign" in form data'})
        campaign = Campaign.objects.get(pk=request.data['campaign'])
        if(campaign.owner != request.user or not campaign.cards.get(pk=pk)): return Response({'Error': 'Authentication error'})
        card = Card.objects.get(pk=pk)
        form = CardForm(request.data, instance=card)
        if(form.is_valid()):
            card = form.save(commit=False)
            if(request.FILES): card.img = request.data['img']
            card.save()
            serializer = CardSerializer(card)
            return Response(serializer.data)
        return Response({'Test': 'False Broke'})

    def destroy(self, request, pk=None):
        if('campaign' not in request.data): return Response({'Error': 'Missing "campaign" in form data'})
        campaign = Campaign.objects.get(pk=request.data['campaign'])
        if(campaign.owner != request.user or not campaign.cards.get(pk=pk)): return Response({'Error': 'Authentication error'})
        for note in Card.objects.get(pk=pk).notes.all():
            Note.objects.get(id=note.id).delete()
        Card.objects.get(pk=pk).img.delete()
        Card.objects.get(pk=pk).delete()
        return Response({'Status': 'Deleted Card ' + str(pk)})

    def get_permissions(self):
        if self.action == 'list': self.permission_classes = [IsUser, ]
        elif self.action == 'retrieve': self.permission_classes = [IsUser, ]
        elif self.action == 'create': self.permission_classes = [IsUser, ]
        elif self.action == 'update': self.permission_classes = [IsUser, ]
        elif self.action == 'destroy': self.permission_classes = [IsUser, ]
        return super(self.__class__, self).get_permissions()


class NoteViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication, TokenAuthentication, ]
    parser_classes = [MultiPartParser, FormParser, JSONParser, ]

    def list(self, request):
        queryset = None
        campaigns = Campaign.objects.filter(owner=request.user.id)
        for campaign in campaigns:
            for card in campaign.cards.all():
                if(queryset == None):
                    if(card.notes.all()):
                        queryset = card.notes.all()
                    continue
                queryset += card.notes.all()
        serializer = NoteSerializer(queryset, many=True)
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


class TagViewSet(viewsets.ViewSet):
    authentication_classes = [
        SessionAuthentication,
        TokenAuthentication,
    ]

    def list(self, request):
        queryset = Tag.objects.all()
        serializer = TagSerializer(queryset, many=True)
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
