# CarCar

Team:

- Person 1 - Which microservice?
- Person 2 - Which microservice?

## Design

1. inventory

   - react component

   - [x] list of manufacturers
   - [x] create manufacture
   - [x] list of vehicle models
   - [x] create vehicle model
   - [x] list of automobiles in inventory
   - [x] add vehicle to inventory

--

2. service

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
     - [ ] vip status
     - [ ] appointment status updating

3. sales
   - create models
   - create api endpoints
   - create react components

## inventory microservice

api endpoints accessible at http://localhost:8100

## Service microservice

api endpoinst accessible at http://localhost:8080

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
