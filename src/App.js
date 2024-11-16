import { Routes, Route, Link, useLocation } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import {logout} from "./actions/auth";
import ProductList from "./pages/rms/ProductList";
import RegisterOrganization from "./pages/rms/RegisterOrganization";
import ProductDetail from "./pages/rms/ProductDetail";
import { useEffect, useState } from "react";

function App() {
  
  const { user, isLoggedIn } = useSelector(state => state.auth);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);

  const handleLogout = ()=>{
    dispatch(logout());
    navigate("/login");
  }

  useEffect(()=>{
    if(window.document.location.pathname.includes('register-org')){
      setIsRegister(true);
    }else{
      setIsRegister(false);
    }
  }, [])
 
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container-fluid">
          { !isRegister && <Link className="navbar-brand" to="/products">FLIPPY</Link> }
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            { !isRegister &&  <Link className="nav-link active" aria-current="page" to="/products">New Arrivals</Link> }
            { !isRegister &&  <a className="nav-link" target="_blank" href="/register-org">Get API Key</a> }
            { isRegister && <a className="nav-link" target="_blank" href="http://localhost:9090/v3/api-docs">API Documentation</a> }
             {/* {isLoggedIn && <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
              </li> }
              {isLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li> }
              {!isLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>}
              {isLoggedIn && <li className="nav-item">
                <a style={{ 'cursor': 'pointer' }} className="nav-link" onClick={()=>handleLogout()}>Logout</a>
              </li>}
              {!isLoggedIn && <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>} */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/register-org" element={<RegisterOrganization />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
