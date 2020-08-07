from rest_framework.authtoken import views as auth_views
from django.urls import path, include
from . import views
from .router import router

urlpatterns = [
    path('login', views.user_login, name='home'),
    path('register', views.user_register, name='logout'),
    path('', include(router.urls))
]
