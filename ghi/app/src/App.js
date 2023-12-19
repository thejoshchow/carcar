import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateManufacturer from './inventory/CreateManufacturer';
import VehicleModelForm from './inventory/VehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturers">
              <Route path="add" element={<CreateManufacturer />} />
            </Route>
            <Route path="models">
              <Route path="add" element={<VehicleModelForm />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
