# CarCar

A database application for car dealerships to track inventory, servicing, and sales.

This application consists of three microservices: inventory, service, and sales.

![img](/images/CarCar.gif)

## Getting started

docker is required to run this application  
for more information on how to install docker, please visit https://docs.docker.com/desktop/

1. fork this repository
2. clone forked repository  
   `git clone <repository.url>`
3. Use docker to run the application with the following commands:

```
docker volume create beta-data
docker-compose build
docker-compose up
```

4. start application by visiting http://localhost:3000/
5. stop the application with the following command  
   `docker-compose down`

## inventory microservice

api endpoints accessible at http://localhost:8100/api/

**Manufacturers**  
| Action | Method | URL |
| ---------------------------- | ------ | -------------------------------------------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/ |
| Create manufacturer | POST | http://localhost:8100/api/manufacturers/ |
| Get specific manufacturer | GET | http://localhost:8100/api/manufacturers/:id/ |
| Update specific manufacturer | PUT | http://localhost:8100/api/manufacturers/:id/ |
| Delete manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ |

- Creating and updating a manufacturer only requires a name

```
{
  "name":"Tesla"
}
```

- GET POST DELETE and PUT for a specific manufacturer requests return:

```
{
	"href": "/api/manufacturers/7/",
	"id": 7,
	"name": "Maserati"
}
```

- List of manufacturers return:

```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Ford"
		},
  ]
}
```

**Vehicle Models**
| Acttion | Method | URL |
| -------------------------- | ------ | ------------------------------------- |
| List vehicle models | GET | http://localhost:8100/api/models/ |
| Create vehicle model | POST | http://localhost:8100/api/models/ |
| Get specific vehicle model | GET | http://localhost:8100/api/models/:id/ |
| Update vehicle model | PUT | http://localhost:8100/api/models/:id/ |
| Delete vehicle model | DELETE | http://localhost:8100/api/models/:id/ |

- creating and updating a vehicle model:

```
{
  "name": "Escape Hybrid",
  "picture_url": "https://www.motortrend.com/uploads/2021/10/2022-Ford-Escape-SE-Hybrid-14.jpg",
  "manufacturer_id": 1
}
```

- GET POST DELETE and PUT for a specific vehicle model return:

```
{
	"id": null,
	"name": "test",
	"picture_url": "http://test.com",
	"manufacturer": {
		"href": "/api/manufacturers/2/",
		"id": 2,
		"name": "Toyota"
	}
}
```

- List of vehicles:

```
{
	"models": [
		{
			"href": "/api/models/1/",
			"id": 1,
			"name": "Bronco",
			"picture_url": "https://www.vdm.ford.com/content/dam/vdm_ford/live/en_us/ford/nameplate/bronco/2024/collections/cyp/BYO_2024_Bronco.png",
			"manufacturer": {
				"href": "/api/manufacturers/1/",
				"id": 1,
				"name": "Ford"
			}
		},
  ]
}
```

**Automobile inventory**
| Action | Method | URL |
|--------|--------|------|
|List automobiles |GET | /automobiles/ |
|Create automobile |POST | /automobiles/ |
|Get specific auto |GET | /automobiles/:vin/ |
|Delete auto |DELETE | /automobiles/:vin/ |
|Set "sold" status | PATCH |/automobiles/:vin/ |

- note: setting "sold" status should only be used by sales microservice poller to sync data

- list of automobiles:

```
{
	"autos": [
		{
			"href": "/api/automobiles/34556748591231232/",
			"id": 2,
			"color": "Black",
			"year": 2023,
			"vin": "34556748591231232",
			"model": {
				"href": "/api/models/5/",
				"id": 5,
				"name": "Model 3",
				"picture_url": "https://cdn.motor1.com/images/mgl/qpGBL/s1/tesla-model-3-gray-2.jpg",
				"manufacturer": {
					"href": "/api/manufacturers/4/",
					"id": 4,
					"name": "Tesla"
				}
			},
			"sold": true
		},
  ]
}
```

## Service microservice

api endpoinst accessible at http://localhost:8080/api/

**technician**

| Action           | Method | URL               |
| ---------------- | ------ | ----------------- |
| List technicians | GET    | /technicians/     |
| Create techs     | POST   | /technicians/     |
| Delete tech      | DELETE | /technicians/:id/ |

- create tech:

```
{
	"first_name": "jon",
	"last_name": "doe",
	"employee_id": "1"
}
```

- list techs return:

```
{
	"technicians": [
		{
			"first_name": "jon",
			"last_name": "doe",
			"employee_id": "1"
		}
	]
}
```

- delete tech return:

```
{
	"deleted": true
}
```

**appointments**

| Action             | Method | URL                       |
| ------------------ | ------ | ------------------------- |
| List appointments  | GET    | /appointments/            |
| Add appointment    | POST   | /appointments/            |
| Show specific appt | GET    | /appointments/:id/        |
| Edit appt          | PUT    | /appointments/:id/        |
| Delete appt        | DELETE | /appointments/:id/        |
| Cancel appt        | PUT    | /appointments/:id/cancel/ |
| Finish appt        | PUT    | /appointments/:id/finish/ |
| List appt history  | GET    | /appointments/history/    |

- list appointments (only upcoming, scheduled) and history (includes only cancelled and completed) return:

```
{
	"appointments": [
		{
			"id": 23,
			"date_time": "2023-12-27T19:56:00+00:00",
			"reason": "aoeu",
			"status": "scheduled",
			"vin": "1VS30NC117RXZ5SNM",
			"customer": "test",
			"vip": true,
			"technician": {
				"name": "josh chow",
				"employee_id": "1"
			}
		}
	]
}
```

- Show specific, create, cancel, finish, return:

```
{
	"appointment": {
		"id": 5,
		"date_time": "2023-12-19T18:00:00+00:00",
		"reason": "testing",
		"status": "cancelled",
		"vin": "something",
		"customer": "jon",
		"technician": {
			"name": "josh chow",
			"employee_id": "1"
		}
	}
}
```

- delete appt return:

```
{
	"deleted": true
}
```

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

4 models:

- auto (inventory) value object
- salesrep
- customer
- sale
  - one to one relation to auto vo
  - related to salesrep
  - related to customer

api endpoint accessible at http://localhost:8090/api/

**salesperson (sales rep)**
| Action | Method | URL |
| ---------------- | ------ | ----------------- |
| List sales reps | GET | /salesreps/ |
| Create sales rep | POST | /salesrep/ |
| Delete sales rep | DELETE | /salesrep/:id/ |
| List sales rep sales history | GET | /salesrep/:id/history/ |

- list sales rep return:

```
{
	"salesreps": [
		{
			"first_name": "test",
			"last_name": "test",
			"employee_id": "test"
		}
	]
}
```

- create sales rep:

```
{
	"first_name": "jon",
	"last_name": "doe",
	"employee_id": "1"
}
```

- create sales rep return:

```
{
	"salesrep": {
		"first_name": "josh",
		"last_name": "chow",
		"employee_id": "1"
	}
}
```

- delete sales rep return:

```
{
	"deleted": "true"
}
```

- sales rep history return:

```
{
	"sales": [
		{
      "id": 11,
			"price": "800.00",
			"salesrep": {
				"first_name": "josh",
				"last_name": "chow",
				"employee_id": "1"
			},
			"customer": {
				"id": 11,
				"first_name": "test",
				"last_name": "test",
				"address": "test test, test, test test",
				"phone_number": "None"
			},
			"auto": {
				"vin": "ABETOC123H123H2",
				"sold": true
			}
    }
  ]
}
```

**customer**
| Action | Method | URL |
| ---------------- | ------ | ----------------- |
| List customers | GET | /customers/ |
| Create customers | POST | /customers/ |
| Delete customers | DELETE | /customers/:id/ |

- list customers return:

```
{
	"customers": [
		{
			"id": 11,
			"first_name": "test",
			"last_name": "test",
			"address": "test test, test, test test",
			"phone_number": "None"
		}
	]
}
```

- create customer:

```
{
	"first_name": "delete",
	"last_name": "me",
	"address": "denver",
	"phone_number": "1234567890"
}
```

- create customer return:

```
{
	"customer": {
		"id": 7,
		"first_name": "delete",
		"last_name": "me",
		"address": "denver",
		"phone_number": "1234567890"
	}
}
```

- delete customer return:

```
{
	"deleted": "true"
}
```

**sale**
| Action | Method | URL |
| ---------------- | ------ | ----------------- |
| List sales | GET | /sales/ |
| Create sale | POST | /sales/ |
| Delete sale | DELETE | /sales/:id/ |

- list sales return:

```
{
	"sales": [
		{
      "id": 11,
			"price": "800.00",
			"salesrep": {
				"first_name": "josh",
				"last_name": "chow",
				"employee_id": "1"
			},
			"customer": {
				"id": 11,
				"first_name": "test",
				"last_name": "test",
				"address": "test test, test, test test",
				"phone_number": "None"
			},
			"auto": {
				"vin": "ABETOC123H123H2",
				"sold": true
			}
    }
  ]
}
```

- create sale:

```
  {
  "price": "200000.48",
  "salesrep": "1",
  "customer": "1",
  "auto": "172839582449581"
  }
```

- create sale return:

```
{
	"sale": {
		{
      "id": 11,
			"price": "800.00",
			"salesrep": {
				"first_name": "josh",
				"last_name": "chow",
				"employee_id": "1"
			},
			"customer": {
				"id": 11,
				"first_name": "test",
				"last_name": "test",
				"address": "test test, test, test test",
				"phone_number": "None"
			},
			"auto": {
				"vin": "ABETOC123H123H2",
				"sold": true
			}
    }
  }
}
```

- delete sale return:

```
{
	"deleted": true
}
```
