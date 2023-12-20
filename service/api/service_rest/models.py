from django.db import models


choices = [
    ("scheduled", "scheduled"),
    ("cancelled", "cancelled"),
    ("finished", "finished"),
]


class AutoVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Appointment(models.Model):
    vip = models.BooleanField(default=False, null=True)
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=choices, default="scheduled")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.PROTECT,
    )

    class Meta:
        ordering = ("date_time",)
