import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-3xl font-semibold tracking-tight bg-clip-text text-white-800">
            Weather Dashboard
          </Link>
          
          <div className="hidden text-4xl  md:flex space-x-4">
            <NavLink className="text-2xl" to="/weather">Weather</NavLink>
            <NavLink  className="text-2xl" to="/feedback">Feedback</NavLink>
          </div>
          
          <button onClick={toggleMenu} className="md:hidden text-white hover:text-teal-400 transition-colors duration-300">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <NavLink to="/weather" onClick={toggleMenu}>Weather</NavLink>
              <NavLink to="/feedback" onClick={toggleMenu}>Feedback</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;