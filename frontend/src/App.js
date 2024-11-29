import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages';
import OrderProcess from "./components/PaymentProcessing/OrderProcess";
import DroneMap from './components/Extra/DroneMap.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/test" element={<OrderProcess/>} exact />
        <Route path="/drone" element={<DroneMap/>} exact />
      </Routes>
    </Router>
  );
}

export default App;