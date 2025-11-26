// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import { Menu, X } from "lucide-react"; // hamburger icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#1003E8] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-poppins font-bold">BaziStudio</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="relative group font-inter text-white hover:text-[#F2730A] transition-colors duration-200"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#F2730A] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          ))}
          <li>
            <Button size="md" onClick={() => alert("Login clicked!")}>
              Login
            </Button>
          </li>
        </ul>

        {/* Mobile Hamburger + Login button */}
        <div className="md:hidden flex items-center space-x-3">
          <Button size="sm" onClick={() => alert("Login clicked!")}>
            Login
          </Button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1003E8] text-white px-4 pb-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-inter text-white hover:text-[#F2730A] transition-colors duration-200 block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
