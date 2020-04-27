from django.urls import path
from . import views

urlpatterns = [
    path('settings', views.settings, name='settings'),
    path('<slug:user_id>', views.profile, name='profile'),
]
