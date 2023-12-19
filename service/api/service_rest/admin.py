from django.contrib import admin

from .models import AutoVO, Technician, Appointment


# Register your models here.
@admin.register(AutoVO)
class AutoVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass
