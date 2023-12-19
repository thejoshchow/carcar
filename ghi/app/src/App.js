import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateManufacturer from './inventory/CreateManufacturer';
import VehicleModelForm from './inventory/VehicleModelForm';
import { useEffect, useState } from 'react';
import ListManufacturers from './inventory/ListManufacturers';
import ListVehicles from './inventory/ListVehicleModels';


function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);

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

  useEffect(() => {
    getManufacturers();
    getVehicleModels();
  }, [])
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers">
              <Route index element={<ListManufacturers manufacturers={manufacturers}/>} />
              <Route path="add" element={<CreateManufacturer getManufacturers={getManufacturers}/>} />
            </Route>
            <Route path="models">
              <Route index element={<ListVehicles />} />
              <Route path="add" element={<VehicleModelForm manufacturers={manufacturers} getVehicleModels={getVehicleModels}/>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
