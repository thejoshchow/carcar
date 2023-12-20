# Generated by Django 4.0.3 on 2023-12-20 19:05

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutoVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=17)),
                ('sold', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('address', models.TextField()),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region='US')),
            ],
        ),
        migrations.CreateModel(
            name='Salesperson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('employee_id', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('auto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.autovo')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.customer')),
                ('salesperson', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.salesperson')),
            ],
        ),
    ]
