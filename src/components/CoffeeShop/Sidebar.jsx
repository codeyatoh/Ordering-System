import React from 'react';
import { HiHome } from 'react-icons/hi';
import { TbCoffee, TbBread } from 'react-icons/tb';

function Sidebar({ activeCategory, setActiveCategory }) {
  return (
    <aside className="sidebar">
      <div className="menu-header">
        <HiHome className="menu-icon" />
        <span>MENU</span>
      </div>
      <nav className="menu-nav">
        <button 
          className={`nav-item ${activeCategory === 'coffee' ? 'active' : ''}`}
          onClick={() => setActiveCategory('coffee')}
        >
          <TbCoffee className="nav-icon" />
          <span>Coffee</span>
        </button>
        <button 
          className={`nav-item ${activeCategory === 'pastry' ? 'active' : ''}`}
          onClick={() => setActiveCategory('pastry')}
        >
          <TbBread className="nav-icon" />
          <span>Bread & Pastry</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar; 