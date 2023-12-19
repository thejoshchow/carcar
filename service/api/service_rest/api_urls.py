from django.urls import path
from .api_views import list_techs

urlpatterns = [
    path("technicians/", list_techs, name="list_techs"),
]
