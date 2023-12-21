import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateManufacturer from './inventory/CreateManufacturer';
import VehicleModelForm from './inventory/VehicleModelForm';
import { useEffect, useState } from 'react';
import ListManufacturers from './inventory/ListManufacturers';
import ListVehicles from './inventory/ListVehicleModels';
import AutomobileForm from './inventory/AddToInvetory';
import ListInventory from './inventory/ListInventory';
import TechnicianForm from './service/TechnicianForm';
import ListTechnicians from './service/ListTechnicians';
import AppointmentForm from './service/AppointmentForm';
import ListAppointments from './service/ListAppointment';
import ServiceHistory from './service/ServiceHistory';
import SalesrepForm from './sales/SalesrepForm';
import ListSalesreps from './sales/ListSalesreps';
import CustomerForm from './sales/CustomerForm';
import ListCustomers from './sales/ListCustomers';


function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [techs, setTechs] = useState([]);
  const [salesreps, setSalesreps] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getManufacturers = async () => {
      const makesUrl = "http://localhost:8100/api/manufacturers/"
      const response = await fetch(makesUrl);
      if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
      }
  }

  const getVehicleModels = async () => {
    const vehiclesUrl = "http://localhost:8100/api/models/";
    const response = await fetch(vehiclesUrl);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  const getInventory = async () => {
    const inventoryUrl = "http://localhost:8100/api/automobiles/";
    const response = await fetch(inventoryUrl);
    if (response.ok) {
      const data = await response.json();
      setInventory(data.autos);
    }
  }

  const getTechnicians = async () => {
    const techUrl = "http://localhost:8080/api/technicians/";
    const response = await fetch(techUrl);
    if (response.ok) {
      const data = await response.json();
      setTechs(data.technicians);
    }
  }

  const getAppointments = async (apptUrl) => {
    const response = await fetch(apptUrl);
    if (response.ok) {
        const data = await response.json();
        return data.appointments 
    }
  }

  const getSalesreps = async () => {
    const salesrepUrl = "http://localhost:8090/api/salesreps/";
    const response = await fetch(salesrepUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesreps(data.salesreps);
    }
  }

  const getCustomers = async () => {
    const customersUrl = "http://localhost:8090/api/customers/";
    const response = await fetch(customersUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    getManufacturers();
    getVehicleModels();
    getInventory();
    getTechnicians();
    getSalesreps();
    getCustomers();
  }, [])
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

            <Route path="inventory">
                <Route index element={<ListInventory inventory={inventory}/>} />
                <Route path="add" element={<AutomobileForm models={models} getInventory={getInventory}/>} />
              <Route path="manufacturers">
                <Route index element={<ListManufacturers manufacturers={manufacturers}/>} />
                <Route path="add" element={<CreateManufacturer getManufacturers={getManufacturers}/>} />
              </Route>
              <Route path="models">
                <Route index element={<ListVehicles />} />
                <Route path="add" element={<VehicleModelForm manufacturers={manufacturers} getVehicleModels={getVehicleModels}/>} />
              </Route>
            </Route>

            <Route path="service">
              <Route path="technicians">
                <Route index element={<ListTechnicians techs={techs} />}/>
                <Route path="add" element={<TechnicianForm getTechs={getTechnicians} />} />
              </Route>
              <Route path="appointments">
                <Route index element={<ListAppointments getAppts={getAppointments} inventory={inventory}/>} />
                <Route path="add" element={<AppointmentForm techs={techs} getAppts={getAppointments}/>} />
                <Route path="history" element={<ServiceHistory getAppts={getAppointments}/>} />
              </Route>
            </Route>

            <Route path="sales">
              <Route index />
              <Route path="add" />
              <Route path="salesreps">
                <Route index element={<ListSalesreps salesreps={salesreps}/>} />
                <Route path=":employeeId" />
                <Route path="add" element={<SalesrepForm getSalesreps={getSalesreps} />} />
              </Route>
              <Route path="customers">
                <Route index element={<ListCustomers customers={customers}/>} />
                <Route path="add" element={<CustomerForm getCustomers={getCustomers}/>}/>
              </Route>
            </Route>

            <Route path="*" element={<p>Sorry, this page does not exist</p>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
