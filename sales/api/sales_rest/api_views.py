from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods

from .models import AutoVO, Salesrep, Customer, Sale
from .encoders import SaleEncoder, SalesrepEncoder, CustomerEncoder

# Create your views here.


@require_http_methods(["GET", "POST"])
def list_salesreps(request):
    if request.method == "GET":
        salesreps = Salesrep.objects.all()
        return JsonResponse(
            {"salesreps": salesreps},
            SalesrepEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        salesrep = Salesrep.objects.create(**content)
        return JsonResponse(
            {"salesrep": salesrep},
            SalesrepEncoder,
            False,
        )


@require_http_methods(["DELETE"])
def delete_salesrep(request, pk):
    try:
        delete = Salesrep.objects.get(employee_id=pk)
        count, _ = delete.delete()
        return JsonResponse({"deleted": count > 0})
    except Salesrep.DoesNotExist:
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
            {"message": "Invalid customer id"},
            status=400,
        )


@require_http_methods(["GET", "POST"])
def list_sales(request, pk=None):
    if request.method == "GET":
        if pk is not None:
            try:
                rep = Salesrep.objects.get(employee_id=pk)
                sales = Sale.objects.filter(salesrep=rep)
            except Salesrep.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid employee id"},
                    status=400,
                )
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            SaleEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        salesrep = content["salesrep"]
        customer = content["customer"]
        auto = content["auto"]

        def except_return(reason):
            return JsonResponse(
                {"message": reason},
                status=400,
            )

        try:
            content["auto"] = AutoVO.objects.get(vin=auto)
            content["salesrep"] = Salesrep.objects.get(employee_id=salesrep)
            content["customer"] = Customer.objects.get(id=customer)
            sale = Sale.objects.create(**content)
            return JsonResponse(
                {"sale": sale},
                SaleEncoder,
                False,
            )
        except AutoVO.DoesNotExist:
            return except_return("Invalid auto vin")
        except Salesrep.DoesNotExist:
            return except_return("Invalid employee id")
        except Customer.DoesNotExist:
            return except_return("Invalid customer id")


@require_http_methods(["DELETE"])
def delete_sale(request, pk):
    try:
        sale = Sale.objects.get(id=pk)
        count, _ = sale.delete()
        return JsonResponse({"deleted": count > 0})
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid sale id"},
            status=400,
        )
