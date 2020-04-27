from django.conf import settings
from django.db import models

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

class Party(models.Model):
    private = models.BooleanField(blank=True, null=True)
    name = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    dm = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="dm")
    adventurers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="adventurers")
    def __str__(self):
        return self.name