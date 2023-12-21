from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.
class AutoVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin


class Salesrep(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = PhoneNumberField(region="US")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Sale(models.Model):
    auto = models.OneToOneField(
        AutoVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    salesrep = models.ForeignKey(
        Salesrep,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return self.auto.vin
