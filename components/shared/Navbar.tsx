// components/Navbar.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Menu, X, Sparkles, ChevronDown, User, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  interface NavLink {
    name: string;
    href: string;
    submenu?: { name: string; href: string; }[];
  }

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    
    // { 
    //   name: "Projects", 
    //   href: "/projects",
    //   submenu: [
    //     { name: "Web Design", href: "/portfolio/web" },
    //     { name: "Mobile Apps", href: "/portfolio/mobile" },
    //     { name: "Dashboard UI", href: "/portfolio/dashboard" },
    //     { name: "E-commerce", href: "/portfolio/ecommerce" },
    //   ]
    // },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Colors
  const gradientBg = "bg-gradient-to-r from-[#0A84FF] to-[#0060CC]";
  const hoverBg = "hover:bg-[#E6F2FF]/10";
  const textColor = "text-white";
  const darkBg = "dark:bg-[#333333]";
  const darkText = "dark:text-[#0A84FF]";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${gradientBg} ${scrolled ? "shadow-lg py-3" : "py-4"}`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white/10`}>
              <span className="font-bold text-white text-lg">BS</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E6F2FF] rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white transition-colors">BaziStudio</span>
              <span className="text-xs text-white/70">Design • Code • Deploy</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${textColor} ${hoverBg}`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Submenu */}
                {link.submenu && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className={`bg-white dark:bg-[#333333] rounded-xl shadow-2xl border border-white/20 min-w-[200px] p-2`}>
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${hoverBg} ${darkText}`}
                        >
                          <div className="w-2 h-2 rounded-full bg-[#0A84FF] group-hover:scale-150 transition-transform"></div>
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover underline */}
                <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#E6F2FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#E6F2FF]/20 transition-all"
            >
              {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
            </button>

            {/* Search */}
            <button className="p-2 rounded-lg bg-white/10 hover:bg-[#E6F2FF]/20 transition-all">
              <Search size={20} className="text-white" />
            </button>

            {/* Login Button */}
            <Button
              onClick={() => alert("Login clicked!")}
              variant="outline"
              size="md"
              icon={<User size={18} />}
              className="border-white text-white hover:bg-[#E6F2FF]/10"
            >
              Login
            </Button>

            {/* Get Started */}
            <Button
              onClick={() => alert("Get Started clicked!")}
              size="md"
              className="bg-linear-to-r from-[#0A84FF] to-[#0060CC] hover:from-[#0060CC] hover:to-[#0A84FF] shadow-lg"
              icon={<Sparkles size={18} />}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Button
              onClick={() => alert("Login clicked!")}
              size="sm"
              variant="outline"
              className="border-white text-white"
            >
              Login
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 shadow-2xl border-t ${gradientBg}`}>
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex justify-between py-3 px-4 rounded-xl ${textColor} ${hoverBg}`}
                  >
                    <span className="font-medium">{link.name}</span>
                    {link.submenu && <ChevronDown size={18} />}
                  </Link>

                  {link.submenu && (
                    <div className="ml-6 mt-2 space-y-2 border-l border-white/20 pl-4">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 px-4 rounded-lg ${hoverBg} ${darkText}`}
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Actions */}
              <div className="pt-6 mt-6 border-t border-white/20 grid grid-cols-2 gap-3">
                <Button
                  onClick={() => { setIsOpen(false); alert("Login clicked!"); }}
                  variant="outline"
                  className="border-white text-white"
                >
                  Login
                </Button>
                <Button
                  onClick={() => { setIsOpen(false); alert("Get Started clicked!"); }}
                  className="bg-linear-to-r from-[#0A84FF] to-[#0060CC]"
                >
                  Get Started
                </Button>
              </div>

              {/* Theme toggle */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#E6F2FF]/20"
                >
                  {darkMode ? <><Sun size={18} className="text-white" /><span className="text-white">Light Mode</span></> 
                            : <><Moon size={18} className="text-white" /><span className="text-white">Dark Mode</span></>}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[76px] transition-all duration-500"></div>
    </>
  );
}
