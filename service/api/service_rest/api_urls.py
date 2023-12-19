from django.urls import path
from .api_views import list_techs, delete_tech

urlpatterns = [
    path("technicians/", list_techs, name="list_techs"),
    path("technicians/<int:pk>/", delete_tech, name="delete_tech"),
]
