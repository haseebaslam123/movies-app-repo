import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-ink/70 border-b border-[color:var(--border)] transition-all">
      <div className="container-page flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent grid place-items-center text-white font-bold">ME</div>
          <span className="font-head text-xl">Movie Explorer</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center gap-6 text-offwhite/90">
          <NavLink to="/" end className={({isActive}) => isActive ? 'text-offwhite' : 'hover:text-offwhite'}>Home</NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? 'text-offwhite' : 'hover:text-offwhite'}>Favorites</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-offwhite' : 'hover:text-offwhite'}>About</NavLink>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="sm:hidden text-offwhite text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-ink/90 text-offwhite flex flex-col gap-4 p-4">
          <NavLink to="/" end onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/favorites" onClick={() => setIsOpen(false)}>Favorites</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>About</NavLink>
        </div>
      )}
    </header>
  );
}
