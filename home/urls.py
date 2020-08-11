from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.home, name='login'),
    path('register', views.home, name='register'),
    path('logout', views.logout, name='logout'),
]
