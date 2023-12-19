from django.db import models


# Create your models here.
class AutoVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.IntegerField(unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technincian = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    class Meta:
        ordering = ("date_time",)
