# Generated by Django 4.0.3 on 2023-12-20 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_appointment_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='vip',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
