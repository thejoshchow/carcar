import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutoVO


def update_sales():
    sold = AutoVO.objects.filter(sold=True, synced=False)
    for auto in sold:
        url = f"http://project-beta-inventory-api-1:8000/api/automobiles/{auto.vin}/"
        requests.patch(url)
    sold.update(synced=True)


def get_autos():
    auto_url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
    r = requests.get(auto_url)
    data = json.loads(r.content)
    for auto in data.get("autos"):
        AutoVO.objects.update_or_create(
            vin=auto.get("vin"),
            defaults={
                "vin": auto.get("vin"),
                "sold": auto.get("sold"),
            },
        )


def poll(repeat=True):
    while True:
        print("Sales poller polling for data")
        try:
            update_sales()
            get_autos()
        except Exception as e:
            print(e, file=sys.stderr)

        if not repeat:
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
