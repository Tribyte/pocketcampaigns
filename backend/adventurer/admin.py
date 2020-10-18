from django.contrib import admin
from .models import Adventurer, Dashboard, Applet, Party

# Register your models here.
admin.site.register(Adventurer)
admin.site.register(Dashboard)
admin.site.register(Applet)
admin.site.register(Party)
