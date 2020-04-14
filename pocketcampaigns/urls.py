from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.conf.urls import handler400, handler403, handler404, handler500

handler404 = 'home.views.page_not_found'

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^api/', include('api.urls')),
    url(r'^campaigns/', include('campaigns.urls')),

    #default
    path('', include('home.urls')),
]
