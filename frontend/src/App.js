import React from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages';
import OrderProcess from "./components/PaymentProcessing/OrderProcess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/test" element={<OrderProcess/>} exact />
        <Route path="/confirm-order/:orderId" element={<ConfirmOrder />} />
      </Routes>
    </Router>
  );
}

export default App;