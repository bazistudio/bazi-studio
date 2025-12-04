// components/Footer.jsx
"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Github, Mail, ArrowUpRight, Figma, Code, Palette } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const portfolioLinks = [
    { name: "Behance", icon: <Palette size={16} />, url: "https://www.behance.net" },
    { name: "Fiverr", icon: "💼", url: "https://www.fiverr.com" },
    { name: "Upwork", icon: "⚡", url: "https://www.upwork.com" },
    { name: "GitHub", icon: <Github size={16} />, url: "https://github.com" },
    { name: "Figma", icon: <Figma size={16} />, url: "https://figma.com" },
    { name: "CodePen", icon: <Code size={16} />, url: "https://codepen.io" },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, url: "https://facebook.com", label: "Facebook" },
    { icon: <Instagram size={18} />, url: "https://instagram.com", label: "Instagram" },
    { icon: <Twitter size={18} />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Github size={18} />, url: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a02c7] via-[#1003E8] to-[#0d028f] text-white pt-10 pb-6 mt-20 overflow-hidden">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F2730A] to-transparent opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Single Row Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2730A] to-[#ff8c2e] flex items-center justify-center">
              <span className="text-white font-bold">BS</span>
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                BaziStudio
              </h2>
              <p className="text-xs text-gray-300 mt-1">
                Design • Code • Deploy
              </p>
            </div>
          </div>

          {/* Center: Portfolio Links */}
          <div className="flex flex-wrap justify-center gap-3">
            {portfolioLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 min-w-[100px]"
              >
                <span className="text-[#F2730A]">{link.icon}</span>
                <span className="text-sm font-medium">{link.name}</span>
                <ArrowUpRight size={12} className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* Right: Social & Contact */}
          <div className="flex items-center gap-4">
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <div className="text-white hover:text-[#F2730A] transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            
            {/* Contact Button */}
            <a
              href="mailto:contact@bazistudio.com"
              className="group flex items-center gap-2 bg-gradient-to-r from-[#F2730A] to-[#ff8c2e] hover:from-[#ff8c2e] hover:to-[#F2730A] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
            >
              <Mail size={14} />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

        {/* Bottom Bar - Single Line */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <div>
            © {currentYear} BaziStudio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#F2730A] transition-colors">
              Privacy
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/terms" className="hover:text-[#F2730A] transition-colors">
              Terms
            </Link>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300">
              Built with <span className="text-red-500">♥</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}