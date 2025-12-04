// components/Navbar.jsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./Button";
import ThemeToggle from './ThemeToggle';
import { Menu, X, Sparkles, ChevronDown, User, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/#portfolio" },
    { name: "Services", href: "/services" },
    { 
      name: "Portfolio", 
      href: "/portfolio",
      submenu: [
        { name: "Web Design", href: "/portfolio/web" },
        { name: "Mobile Apps", href: "/portfolio/mobile" },
        { name: "Dashboard UI", href: "/portfolio/dashboard" },
        { name: "E-commerce", href: "/portfolio/ecommerce" },
      ]
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg py-3 border-b border-gray-200 dark:border-gray-800" 
          : "bg-gradient-to-r from-[#1003E8] via-[#0a02c7] to-[#463261] py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              scrolled 
                ? "bg-gradient-to-br from-[#1003E8] to-[#463261] shadow-lg" 
                : "bg-white/10 backdrop-blur-sm"
            }`}>
              <span className="font-bold text-white text-lg">BS</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#F2730A] to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold transition-colors ${
                scrolled ? "text-gray-900 dark:text-white" : "text-white"
              }`}>
                BaziStudio
              </span>
              <span className="text-xs opacity-70 text-gray-300">
                Design • Code • Deploy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                    scrolled 
                      ? "text-gray-700 dark:text-gray-300 hover:text-[#1003E8] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" 
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />}
                </Link>
                
                {/* Submenu Dropdown */}
                {link.submenu && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[200px] p-2">
                      {link.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group/sub"
                        >
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#1003E8] to-[#F2730A] group-hover/sub:scale-150 transition-transform"></div>
                          <span className="text-gray-700 dark:text-gray-300 group-hover/sub:text-gray-900 dark:group-hover/sub:text-white">
                            {subitem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Active Indicator */}
                <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#F2730A] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                  scrolled ? "opacity-100" : "opacity-80"
                }`}></div>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={20} className={scrolled ? "text-gray-700 dark:text-yellow-500" : "text-white"} />
              ) : (
                <Moon size={20} className={scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"} />
              )}
            </button>

            {/* Search Button */}
            <button
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Search"
            >
              <Search size={20} className={scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"} />
            </button>

            {/* Login Button */}
            <Button
              onClick={() => alert("Login clicked!")}
              variant={scrolled ? "primary" : "outline"}
              size="md"
              icon={<User size={18} />}
              className={`${scrolled ? "" : "border-white text-white hover:bg-white/10"}`}
            >
              Login
            </Button>

            {/* Get Started Button */}
            <Button
              onClick={() => alert("Get Started clicked!")}
              size="md"
              className="bg-gradient-to-r from-[#F2730A] to-orange-500 hover:from-orange-500 hover:to-[#F2730A] shadow-lg hover:shadow-xl"
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
              variant={scrolled ? "primary" : "outline"}
              className={`${scrolled ? "" : "border-white text-white"}`}
            >
              Login
            </Button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? "bg-gray-100 dark:bg-gray-800" 
                  : "bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className={scrolled ? "text-gray-700 dark:text-white" : "text-white"} />
              ) : (
                <Menu size={24} className={scrolled ? "text-gray-700 dark:text-white" : "text-white"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`lg:hidden absolute top-full left-0 right-0 shadow-2xl border-t transition-all duration-300 ${
            scrolled 
              ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" 
              : "bg-gradient-to-b from-[#1003E8] to-[#0a02c7] border-white/20"
          }`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 ${
                        scrolled 
                          ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" 
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span className="font-medium">{link.name}</span>
                      {link.submenu && <ChevronDown size={18} />}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {link.submenu && (
                      <div className="ml-6 mt-2 space-y-2 border-l border-white/20 pl-4">
                        {link.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-4 rounded-lg transition-colors ${
                              scrolled 
                                ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" 
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            • {subitem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-6 mt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        alert("Login clicked!");
                      }}
                      variant="outline"
                      className={scrolled ? "border-gray-300" : "border-white text-white"}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        alert("Get Started clicked!");
                      }}
                      className="bg-gradient-to-r from-[#F2730A] to-orange-500"
                    >
                      Get Started
                    </Button>
                  </div>
                  
                  {/* Theme Toggle Mobile */}
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={toggleDarkMode}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        scrolled 
                          ? "bg-gray-100 dark:bg-gray-800" 
                          : "bg-white/10"
                      }`}
                    >
                      {darkMode ? (
                        <>
                          <Sun size={18} className={scrolled ? "text-gray-700 dark:text-yellow-500" : "text-white"} />
                          <span className={scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon size={18} className={scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"} />
                          <span className={scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"}>Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className={`h-[76px] transition-all duration-500 ${
        scrolled ? "h-[68px]" : ""
      }`}></div>
    </>
  );
}