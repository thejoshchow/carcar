from django.urls import path
from .api_views import (
    list_techs,
    delete_tech,
    list_appts,
    appt_detail,
    cancel_appt,
    finish_appt,
    list_scheduled_appts,
)

urlpatterns = [
    path("technicians/", list_techs, name="list_techs"),
    path("technicians/<str:id>/", delete_tech, name="delete_tech"),
    path("appointments/all/", list_appts, name="list_appts"),
    path("appointments/<int:pk>", appt_detail, name="appt_detail"),
    path("appointments/<int:pk>/cancel/", cancel_appt, name="cancel_appt"),
    path("appointments/<int:pk>/finish/", finish_appt, name="finish_appt"),
    path("appointments/", list_scheduled_appts),
]
