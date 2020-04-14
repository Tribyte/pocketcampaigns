from django.urls import path
from . import views

urlpatterns = [
    path('login', views.user_login, name='home'),
    path('register', views.user_register, name='logout'),
    path('new_campaign', views.new_campaign, name="new_campaign"),
    # path('delete/<int:id>', views.delete_campaign, name='delete_campaign'),
    # path('<int:campaign_id>/<int:tag_id>/delete', views.remove_tag, name="remove_tag"),
    # path('<int:campaign_id>/<slug:card_id>/<str:tag_name>', views.add_tag, name="add_tag"),
    # path('<int:campaign_id>/<slug:card_id>/<int:tag_id>/toggle', views.toggle_tag, name="toggle_tag"),
]
