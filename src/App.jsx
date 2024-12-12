import React, {useState, useEffect} from 'react'
import {Route, BrowserRouter as Router, Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import { CoffeeClass, Landing, OurCoffees,OrderForm } from './pages';
import './index.css'







function App() {
  return (
    <main className="w-screen h-screen overflow-hidden">
    <Router>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/ourcoffees" element={<OurCoffees/>}/>
          <Route path="/coffeeclass" element={<CoffeeClass/>}/>
          <Route path="/orderform" element={<OrderForm/>}/>
        </Routes>
      </div>
    </Router>
    </main>
  )
}

export default App
