import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>

        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Inventory
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><NavLink className="dropdown-item" to="/inventory/manufacturers">Manufacturers</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/manufacturers/add">Add make</NavLink></li>
            <li><NavLink className="dropdown-item" to="/inventory/models/add">Add vehicle model</NavLink></li>
          </ul>
        </div>

        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Service
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          </ul>
        </div>

        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Sales
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          </ul>
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
