from django.contrib import admin
from .models import AutoVO, Salesrep, Customer, Sale


# Register your models here.
@admin.register(AutoVO)
class AutoVOAdmin(admin.ModelAdmin):
    list_display = [
        "vin",
        "sold",
    ]


@admin.register(Salesrep)
class SalesrepAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass
