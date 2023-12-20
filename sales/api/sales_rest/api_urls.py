from django.urls import path
from .api_views import list_salesreps, delete_salesrep

urlpatterns = [
    path("salesrep/", list_salesreps),
    path("salesrep/<str:pk>/", delete_salesrep),
]
