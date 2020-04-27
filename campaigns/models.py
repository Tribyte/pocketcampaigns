from django.conf import settings
from django.db import models
from adventurer.models import Party

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

class Note(models.Model):
    private = models.BooleanField(blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    order_position = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return self.note

class Tag(models.Model):
    tag = models.CharField(max_length=128, blank=True, null=True)
    def __str__(self):
        return self.tag

class Card(models.Model):
    img = models.ImageField(upload_to='card/', blank=True, null=True)
    name = models.CharField(max_length=256, blank=True, null=True)
    identifiers = models.ManyToManyField(Note, related_name="identifier", blank=True)
    description = models.TextField(blank=True, null=True)
    notes = models.ManyToManyField(Note, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    def __str__(self):
        return self.name

class Campaign(models.Model):
    private = models.BooleanField(blank=True, null=True)
    img = models.ImageField(upload_to='campaign/', blank=True, null=True)
    title = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="creator")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="owner")
    parties = models.ManyToManyField(Party, blank=True)
    cards = models.ManyToManyField(Card, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    def __str__(self):
        return self.title