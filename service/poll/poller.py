import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here. Ignore vs-code error hinting
from service_rest.models import AutoVO


def get_autos():
    url = "http://project-beta-inventory-api-1:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for auto in content["autos"]:
        AutoVO.objects.update_or_create(
            defaults={
                "vin": auto.get("vin"),
                "sold": auto.get("sold"),
            },
        )


def poll(repeat=True):
    while True:
        print("Service poller polling for data")
        try:
            get_autos()
            print("SERVICE POLLING SUCCESSFUL")

        except Exception as e:
            print(e, file=sys.stderr)

        if not repeat:
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
