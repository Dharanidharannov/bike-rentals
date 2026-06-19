import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Bikes from "./pages/Bikes";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import MountainBikes from "./pages/MountainBikes";
import CityBikes from "./pages/CityBikes";
import ElectricBikes from "./pages/ElectricBikes";

import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              
              {/* Nested Routing for Bikes */}
              <Route path="/bikes" element={<Bikes />}>
                <Route path="mountain" element={<MountainBikes />} />
                <Route path="city" element={<CityBikes />} />
                <Route path="electric" element={<ElectricBikes />} />
              </Route>
              
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;