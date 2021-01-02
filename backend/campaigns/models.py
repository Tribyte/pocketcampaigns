from django.conf import settings
from django.db import models
from adventurer.models import Party

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

class Note(models.Model):
    private = models.BooleanField(blank=True, null=True)
    note = models.TextField(default=" ")
    order_position = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return self.note

class Tag(models.Model):
    identifier = models.BooleanField(default=False)
    tag = models.CharField(max_length=128, default=" ")
    def __str__(self):
        return self.tag

class Card(models.Model):
    img = models.ImageField(upload_to='card/', blank=True, null=True)
    name = models.CharField(max_length=256, default=" ")
    description = models.TextField(blank=True, null=True)
    notes = models.ManyToManyField(Note, related_name="card_notes", blank=True)
    tags = models.ManyToManyField(Tag, related_name="card_tags", blank=True)
    def __str__(self):
        return self.name

class Campaign(models.Model):
    private = models.BooleanField(blank=True, null=True)
    img = models.ImageField(upload_to='campaign/', blank=True, null=True)
    title = models.CharField(max_length=256, default=" ")
    description = models.TextField(blank=True, null=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="creator")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="owner")
    parties = models.ManyToManyField(Party, blank=True)
    cards = models.ManyToManyField(Card, related_name="campaign_cards", blank=True)
    tags = models.ManyToManyField(Tag, related_name="campaign_tags", blank=True)

    def __str__(self):
        return self.title