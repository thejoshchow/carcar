from django.urls import path
from .api_views import (
    list_salesreps,
    delete_salesrep,
    list_customers,
    delete_customer,
)

urlpatterns = [
    path("salesreps/", list_salesreps),
    path("salesreps/<str:pk>/", delete_salesrep),
    path("customers/", list_customers),
    path("customers/<int:pk>/", delete_customer),
]
