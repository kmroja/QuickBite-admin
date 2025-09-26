// src/components/AdminNavbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';
import { styles, navLinks } from '../../assets/dummyadmin';

const FRONTEND_URL = "https://quickbite-frontendapp.netlify.app/";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData?.role === "admin") setIsAdmin(true);
  }, []);

  const handleSwitchFrontend = () => {
    window.open(FRONTEND_URL, "_blank");
  };

  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <GiChefToque className={styles.logoIcon} />
          <span className={styles.logoText}>Admin Panel</span>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.menuButton}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Switch to Frontend Button */}
          {isAdmin && (
            <div className="ml-4 flex-shrink-0 group">
              <button
                onClick={handleSwitchFrontend}
                className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-lime-400 to-emerald-600 
                           text-white rounded-2xl shadow-lg hover:scale-105 hover:shadow-emerald-500/60 
                           transition-transform font-semibold overflow-hidden"
              >
                {/* Glow animation */}
                <span className="absolute inset-0 bg-emerald-400 opacity-10 blur-xl animate-pulse rounded-2xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <GiForkKnifeSpoon className="inline-block transition-transform duration-500 group-hover:rotate-[360deg]" />
                  Switch to Frontend
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          {/* Mobile Switch to Frontend Button */}
          {isAdmin && (
            <div className="mt-3 px-4 group">
              <button
                onClick={handleSwitchFrontend}
                className="relative flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-br from-lime-400 to-emerald-600 
                           text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-emerald-500/60 
                           transition-transform font-semibold overflow-hidden"
              >
                <span className="absolute inset-0 bg-emerald-400 opacity-10 blur-xl animate-pulse rounded-xl"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <GiForkKnifeSpoon className="inline-block transition-transform duration-500 group-hover:rotate-[360deg]" />
                  Switch to Frontend
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
