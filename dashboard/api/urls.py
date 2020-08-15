from rest_framework.authtoken import views as auth_views
from django.urls import path, include
from .navigation.sidebar.basic import sidebar

urlpatterns = [
    path('nav/sidebar/basic/templates/element', sidebar.element, name='element'),
    path('nav/sidebar/basic/templates/sub-element', sidebar.sub_element, name='sub-element'),
]
