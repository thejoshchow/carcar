# CarCar

Team:

- Person 1 - Which microservice?
- Person 2 - Which microservice?

## Design

## inventory microservice

api endpoints accessible at http://localhost:8100

1. inventory

   - react component

   - [x] list of manufacturers
   - [x] create manufacture
   - [x] list of vehicle models
   - [x] create vehicle model
   - [x] list of automobiles in inventory
   - [x] add vehicle to inventory

## Service microservice

todo: adjust api delete functions so that they actually return 400 status if invalid ids

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

- [ ] create api endpoints

  - [x] list salespeople
  - [x] create salesperson
  - [x] delete salesperson
  - [x] list customers
  - [x] create customer
  - [x] delete customer
  - [ ] list sales
  - [ ] create sale
  - [ ] delete sale

- [x] auto poller

- [ ] create react components

  - [ ] add salesperson
  - [ ] list all salespeople
  - [ ] add customer
  - [ ] list all customers
  - [ ] record a new sale
  - [ ] list all sales
  - [ ] salesperson history

Explain your models and integration with the inventory
microservice, here.
