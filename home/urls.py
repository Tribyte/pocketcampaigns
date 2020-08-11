from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.landing, name='home'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
]
