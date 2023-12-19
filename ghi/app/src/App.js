import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateManufacturer from './inventory/CreateManufacturer';
import VehicleModelForm from './inventory/VehicleModelForm';
import { useEffect, useState } from 'react';
import ListManufacturers from './inventory/ListManufacturers';


function App() {
  const [manufacturers, setManufacturers] = useState([]);

  const getManufacturers = async () => {
      const makesUrl = "http://localhost:8100/api/manufacturers/"
      const response = await fetch(makesUrl);
      if (response.ok) {
          const data = await response.json();
          setManufacturers(data.manufacturers);
      }
  }

  useEffect(() => {
    getManufacturers();
  }, [])
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers" element={<ListManufacturers manufacturers={manufacturers}/>}>
              <Route path="add" element={<CreateManufacturer getManufacturers={getManufacturers}/>} />
            </Route>
            <Route path="models">
              <Route path="add" element={<VehicleModelForm manufacturers={manufacturers}/>} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
