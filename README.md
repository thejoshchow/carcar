# CarCar

A database application for car dealerships to track inventory, servicing, and sales.

This application consists of three microservices: inventory, service, and sales.

[img](/images/CarCar.gif)

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

- react component

- [x] list of manufacturers
- [x] create manufacture
- [x] list of vehicle models
- [x] create vehicle model
- [x] list of automobiles in inventory
- [x] add vehicle to inventory

## Service microservice

todo:

- [x] adjust api delete functions so that they actually return 400 status if invalid ids

api endpoinst accessible at http://localhost:8080

- [x] create models

  - [x] technician model
  - [x] autoVO
  - [x] appointment model

- [x] create api endpoints

  - [x] list techs
  - [x] create tech
  - [x] delete tech
  - [x] list appts
  - [x] create appt
  - [x] delete appt
  - [x] set appt status to cancelled
  - [x] set appt status to finished

- [x] auto poller

- [x] create react components
  - [x] add a tech
  - [x] list all techs (employee id, name)
  - [x] create service appt
  - [x] list all appts (vin, customer name, date, time of appt)
  - [x] service history
  - _todo: client or server-side filtering more appropriate? currently filtering server-side. makes more sense, resource-wise, to not send all data indiscriminately_
  - [x] vip status
  - [x] appointment status updating

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

api endpoint accessible at http://localhost:8090

- [x] create models

  - [x] salesperson
  - [x] customer
  - [x] sale
  - [x] autoVO

- [x] create api endpoints

  - [x] list salespeople
  - [x] create salesperson
  - [x] delete salesperson
  - [x] list customers
  - [x] create customer
  - [x] delete customer
  - [x] list sales
  - [x] create sale
  - [x] delete sale
  - [x] sales rep history

- [x] auto poller

- [x] create react components

  - [x] add salesperson
  - [x] list all salespeople
  - [x] add customer
  - [x] list all customers
  - [x] record a new sale
  - [x] list all sales
  - [x] salesperson history
    - two methods to view history by sales rep.
      1. clickthrough when viewing list of all reps.
      2. sales history page with dropdown to select name

Explain your models and integration with the inventory
microservice, here.

- four models
