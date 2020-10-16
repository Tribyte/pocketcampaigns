from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

class Applet(models.Model):
    url = models.URLField()
    x = models.IntegerField()
    y = models.IntegerField()
    height = models.IntegerField()
    width = models.IntegerField()

class Dashboard(models.Model):
    title = models.CharField(max_length=256, null=True, blank=True)
    applets = models.ManyToManyField(Applet, related_name="applets", blank=True)

class Adventurer(models.Model):
    THEME_CHOICES = (
        ('the_surface', 'The Surface'),
        ('rain', 'Rain'),
    )
    theme = models.CharField(max_length=256, choices=THEME_CHOICES, default="The Surface")
    NAV_CHOICES = (
        ('sidebar_basic', 'Basic Sidebar'),
    )
    nav_style = models.CharField(max_length=256, choices=NAV_CHOICES, default="Sidebar Old")
    dashboards = models.ManyToManyField(Dashboard, related_name="dashboards", blank=True)
    def __str__(self):
        return User.objects.get(pk=self.pk).username

class Party(models.Model):
    private = models.BooleanField(blank=True, null=True)
    name = models.CharField(max_length=256, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    dm = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET(get_sentinel_user), blank=True, null=True, related_name="dm")
    adventurers = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="adventurers")
    def __str__(self):
        return self.name