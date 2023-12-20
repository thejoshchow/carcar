from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class AutoVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20, unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = PhoneNumberField(max_length=10, region="US")


class Sale(models.Model):
    auto = models.ForeignKey(
        AutoVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )
