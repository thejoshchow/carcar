from django.shortcuts import render
from django.http import JsonResponse
import requests
import json
from django.views.decorators.http import require_http_methods

from .models import Salesperson, Customer, Sale
from common.json import ModelEncoder

# Create your views here.


class SalesrepEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


@require_http_methods(["GET", "POST"])
def list_salesreps(request):
    if request.method == "GET":
        salesreps = Salesperson.objects.all()
        return JsonResponse(
            {"salesreps": salesreps},
            SalesrepEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        salesrep = Salesperson.objects.create(**content)
        return JsonResponse(
            {"salesrep": salesrep},
            SalesrepEncoder,
            False,
        )


@require_http_methods(["DELETE"])
def delete_salesrep(request, pk):
    try:
        delete = Salesperson.objects.filter(employee_id=pk)
        count, _ = delete.delete()
        return JsonResponse({"deleted": count > 0})
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid employee id"},
            status=400,
        )


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            CustomerEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"customer": customer},
            CustomerEncoder,
            False,
        )


@require_http_methods(["DELETE"])
def delete_customer(request, pk):
    try:
        delete = Customer.objects.get(id=pk)
        count, _ = delete.delete()
        return JsonResponse({"deleted": count > 0})
    except Customer.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid customer data"},
            status=400,
        )