from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutoVO, Technician, Appointment


class ListTechEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


@require_http_methods(["GET", "POST"])
def list_techs(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"technicians": techs},
            ListTechEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
            ListTechEncoder,
            False,
        )


@require_http_methods("DELETE")
def delete_tech(request, pk):
    try:
        count, _ = Technician.objects.get(employee_id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician not in records"},
            status=400,
        )
