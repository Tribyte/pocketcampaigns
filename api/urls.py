from django.urls import path
from . import views

urlpatterns = [
    path('login', views.user_login, name='home'),
    path('register', views.user_register, name='logout'),
    path('new_campaign', views.new_campaign, name='new_campaign'),
    path('delete_campaign', views.delete_campaign, name='delete_campaign'),
    path('new_card', views.new_card, name="new_card"),
    path('new_identifier', views.new_identifier, name="new_identifier"),
    path('new_tag', views.new_tag, name="new_tag"),
]
