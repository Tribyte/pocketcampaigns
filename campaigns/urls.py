from django.urls import path
from . import views

urlpatterns = [
    path('', views.campaigns, name='campaigns'),
    path('<int:campaign_id>/', views.campaign, name='campaign'),
    path('<int:campaign_id>/card/<int:card_id>', views.card, name='card'),
]
