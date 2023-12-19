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
import ListTechs from './service/ListTechnicians';


function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [techs, setTechs] = useState([]);

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

  useEffect(() => {
    getManufacturers();
    getVehicleModels();
    getInventory();
    getTechnicians();
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
                <Route index element={<ListTechs techs={techs} />}/>
                <Route path="add" element={<TechnicianForm />} />
              </Route>
            </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
