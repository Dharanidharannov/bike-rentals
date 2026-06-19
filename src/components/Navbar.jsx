import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "/Bikelogo.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(AppContext);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`Navbar ${theme}`}>
      <div className="logo-section">
        <img src={logo} alt="Logo" />
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`navlinks ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/admin" onClick={closeMenu}>Admin</Link>
        <Link to="/bikes" onClick={closeMenu}>Bikes</Link>
        <Link to="/booking" onClick={closeMenu}>Booking</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;