from django.contrib import admin
from .models import Campaign, Card, Tag, Note

admin.site.register(Campaign)
admin.site.register(Card)
admin.site.register(Tag)
admin.site.register(Note)
