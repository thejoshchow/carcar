from common.json import ModelEncoder
from .models import Salesrep, Customer, Sale


class SalesrepEncoder(ModelEncoder):
    model = Salesrep
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "salesrep",
        "customer",
    ]

    encoders = {
        "customer": CustomerEncoder(),
        "salesrep": SalesrepEncoder(),
    }

    def get_extra_data(self, o):
        return {
            "auto": {
                "vin": o.auto.vin,
                "sold": o.auto.sold,
            }
        }
