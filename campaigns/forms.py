from django import forms
from campaigns.models import Campaign, Card, Note, Tag

class CampaignForm(forms.ModelForm):
    class Meta:
        model = Campaign
        exclude = ['owner', 'creator', 'img',]

class CardForm(forms.ModelForm):
    class Meta:
        model = Card
        exclude = ['img',]

class NoteForm(forms.ModelForm):
    class Meta:
        model = Note
        fields = '__all__'

class TagForm(forms.ModelForm):
    class Meta:
        model = Tag
        fields = '__all__'