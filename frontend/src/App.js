import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages';

import OrderProcess from "./components/PaymentProcessing/OrderProcess";
import OrderForm from "./components/PaymentProcessing/OrderForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact />

        <Route path="/OrderForm" element={<OrderForm/>} exact />
        <Route path="/test" element={<OrderProcess/>} exact />
      </Routes>
    </Router>
  );
}

export default App;