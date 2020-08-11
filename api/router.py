from adventurer.api.viewsets import PartyViewSet
from campaigns.api.viewsets import CampaignViewSet, CardViewSet, NoteViewSet, TagViewSet
from home.api.viewsets import AuthViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('parties', PartyViewSet, basename="parties")
router.register('campaigns', CampaignViewSet, basename="campaigns")
router.register('cards', CardViewSet, basename="cards")
router.register('notes', NoteViewSet, basename="notes")
router.register('tags', TagViewSet, basename="tags")
# router.register('auth', AuthViewSet, basename="auth")
