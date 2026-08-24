"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Menu, X, Sparkles, ChevronDown, User, Search, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  interface NavLink {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
  }

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-gradient-to-r from-primary via-primary/95 to-secondary text-primary-foreground ${scrolled ? "shadow-lg py-3" : "py-4"}`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-white/10 border border-white/20">
              <span className="font-bold text-white text-lg">BS</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white transition-colors">BaziStudio</span>
              <span className="text-xs text-white/80">Design • Code • Deploy</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 text-white hover:bg-white/10 font-medium text-sm"
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Submenu */}
                {link.submenu && (
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-card text-card-foreground rounded-xl shadow-2xl border border-border min-w-[200px] p-2">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-muted text-foreground"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
                          <span>{sub.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover underline */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Search */}
            <button
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Login Button */}
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              size="md"
              icon={<User size={18} />}
              className="border-white/80 text-white hover:bg-white/10"
            >
              Login
            </Button>

            {/* Get Started */}
            <Button
              onClick={() => router.push("/contact")}
              size="md"
              className="bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
              icon={<Sparkles size={18} />}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Button
              onClick={() => router.push("/login")}
              size="sm"
              variant="outline"
              className="border-white/80 text-white"
            >
              Login
            </Button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/10 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 shadow-2xl border-t border-white/10 bg-primary text-primary-foreground">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex justify-between py-3 px-4 rounded-xl text-white hover:bg-white/10"
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
                          className="block py-2 px-4 rounded-lg hover:bg-white/10 text-white"
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
                  onClick={() => { setIsOpen(false); router.push("/login"); }}
                  variant="outline"
                  className="border-white text-white"
                >
                  Login
                </Button>
                <Button
                  onClick={() => { setIsOpen(false); router.push("/contact"); }}
                  className="bg-accent text-white hover:bg-accent/90"
                >
                  Get Started
                </Button>
              </div>

              {/* Theme toggle */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  {darkMode ? <><Sun size={18} /><span>Light Mode</span></> 
                            : <><Moon size={18} /><span>Dark Mode</span></>}
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
