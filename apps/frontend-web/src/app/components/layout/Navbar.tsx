"use client";
import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navbar = ({ activeSection, onSectionChange }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="logo" onClick={() => handleNavClick("home")}>
        <i className="fas fa-utensils"></i>
        <h1>ChefGPT</h1>
      </Link>

      <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
        <Link
          href="#"
          className={`nav-link ${activeSection === "home" ? "active" : ""}`}
          onClick={() => handleNavClick("home")}
        >
          <i className="fas fa-home"></i> Home
        </Link>
        <Link
          href="#"
          className={`nav-link ${activeSection === "add" ? "active" : ""}`}
          onClick={() => handleNavClick("add")}
        >
          <i className="fas fa-plus-circle"></i> Add Recipe
        </Link>
        <Link
          href="#"
          className={`nav-link ${activeSection === "about" ? "active" : ""}`}
          onClick={() => handleNavClick("about")}
        >
          <i className="fas fa-info-circle"></i> About
        </Link>
        <Link
          href="#"
          className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
          onClick={() => handleNavClick("contact")}
        >
          <i className="fas fa-envelope"></i> Contact
        </Link>
      </div>

      <button
        className="md:hidden text-gray-600 hover:text-rose-500"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>
    </nav>
  );
};

export default Navbar;
