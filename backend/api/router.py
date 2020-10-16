from adventurer.viewsets import PartyViewSet
from campaigns.viewsets import CampaignViewSet, CardViewSet, NoteViewSet, TagViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('parties', PartyViewSet, basename="parties")
router.register('campaigns', CampaignViewSet, basename="campaigns")
router.register('cards', CardViewSet, basename="cards")
router.register('notes', NoteViewSet, basename="notes")
router.register('tags', TagViewSet, basename="tags")