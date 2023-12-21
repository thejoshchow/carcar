# CarCar

A database application for car dealerships to track inventory, servicing, and sales.

This application consists of three microservices: inventory, service, and sales.

## Howto

docker is required to run this application  
for more information on how to install docker, please visit https://docs.docker.com/desktop/

1. clone repository  
   `git clone https://gitlab.com/hack_reactor/project-beta.git`
2. build docker containers  
   `docker-compose up`
3. run docker containers  
   `docker-compose up`
4. start application by visiting http://localhost:3000/

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

- GET /manufacturers/
  Sample Response  
   `{  
  "href": "/api/manufacturers/1/",  
  "id": 1,  
  "name": "Chrysler"  
}`
- POST /manufacturers/
  - only requires a name
    Sample Body
    `{
  "name": "Chrysler"
}`
-

| Acttion                    | Method | URL                                   |
| -------------------------- | ------ | ------------------------------------- |
| List vehicle models        | GET    | http://localhost:8100/api/models/     |
| Create vehicle model       | POST   | http://localhost:8100/api/models/     |
| Get specific vehicle model | GET    | http://localhost:8100/api/models/:id/ |
| Update vehicle model       | PUT    | http://localhost:8100/api/models/:id/ |
| Delete vehicle model       | DELETE | http://localhost:8100/api/models/:id/ |

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
