from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutoVO, Technician, Appointment


class TechEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class ApptEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "vip",
    ]

    def get_extra_data(self, o):
        return {
            "technician": {
                "name": f"{o.technician.first_name} {o.technician.last_name}",
                "employee_id": o.technician.employee_id,
            }
        }


@require_http_methods(["GET", "POST"])
def list_techs(request):
    if request.method == "GET":
        techs = Technician.objects.all()
        return JsonResponse(
            {"technicians": techs},
            TechEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        tech = Technician.objects.create(**content)
        return JsonResponse(
            tech,
            TechEncoder,
            False,
        )


@require_http_methods("DELETE")
def delete_tech(request, id):
    try:
        count, _ = Technician.objects.get(employee_id=id).delete()
        return JsonResponse({"deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician not in records"},
            status=400,
        )


@require_http_methods(["GET"])
def list_appt_history(request):
    if request.method == "GET":
        appts = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appts},
            ApptEncoder,
            False,
        )


@require_http_methods(["GET", "POST"])
def list_scheduled_appts(request):
    if request.method == "GET":
        appts = Appointment.objects.filter(status="scheduled")
        return JsonResponse(
            {"appointments": appts},
            ApptEncoder,
            False,
        )
    else:
        content = json.loads(request.body)
        content["status"] = "scheduled"
        tech = content["technician"]
        try:
            content["technician"] = Technician.objects.get(employee_id=tech)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not in records"},
                status=400,
            )
        if len(AutoVO.objects.filter(vin=content["vin"])) > 0:
            content["vip"] = True
        appt = Appointment.objects.create(**content)
        return JsonResponse(
            {"appointment": appt},
            ApptEncoder,
            False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def appt_detail(request, pk):
    if request.method == "GET":
        appt = Appointment.objects.get(id=pk)
        return JsonResponse(
            {"appointment": appt},
            ApptEncoder,
            False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0},
        )
    else:
        content = json.loads(request.body)
        appt = Appointment.objects.filter(id=pk).update(**content)
        return JsonResponse(
            {"appointment": appt},
            ApptEncoder,
            False,
        )


@require_http_methods(["PUT"])
def cancel_appt(request, pk):
    Appointment.objects.filter(id=pk).update(status="cancelled")
    appt = Appointment.objects.get(id=pk)
    return JsonResponse(
        {"appointment": appt},
        ApptEncoder,
        False,
    )


@require_http_methods(["PUT"])
def finish_appt(request, pk):
    Appointment.objects.filter(id=pk).update(status="finished")
    appt = Appointment.objects.get(id=pk)
    return JsonResponse(
        {"appointment": appt},
        ApptEncoder,
        False,
        status=200,
    )
