// components/Footer.jsx
"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1003E8] backdrop-blur-md text-white py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Left Section */}
        <div className="space-y-4 text-left md:text-left">
          <h2 className="text-xl font-poppins font-semibold text-white">BaziStudio</h2>
          <p className="font-inter text-base">
            We work remotely, delivering modern web & mobile projects for clients globally.
          </p>
        </div>

        {/* Center Section */}
        <div className="space-y-4 text-center md:text-center">
          <h2 className="text-xl font-poppins font-semibold text-white">Portfolio Links</h2>
          <div className="flex justify-center flex-wrap gap-4 font-inter">
            <Link href="https://www.behance.net" target="_blank" className="hover:text-[#F2730A]">Behance</Link>
            <Link href="https://www.fiverr.com" target="_blank" className="hover:text-[#F2730A]">Fiverr</Link>
            <Link href="https://www.upwork.com" target="_blank" className="hover:text-[#F2730A]">Upwork</Link>
            <Link href="https://github.com" target="_blank" className="hover:text-[#F2730A]">GitHub</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 text-left md:text-right">
          <h2 className="text-xl font-poppins font-semibold text-white">Follow Us</h2>
          <div className="flex justify-start md:justify-end space-x-6">
            <a href="https://facebook.com" target="_blank"><Facebook size={24} className="hover:text-[#F2730A]" /></a>
            <a href="https://instagram.com" target="_blank"><Instagram size={24} className="hover:text-[#F2730A]" /></a>
            <a href="https://twitter.com" target="_blank"><Twitter size={24} className="hover:text-[#F2730A]" /></a>
            <a href="https://github.com" target="_blank"><Github size={24} className="hover:text-[#F2730A]" /></a>
          </div>
        </div>

      </div>

      <div className="mt-12 text-center text-sm font-inter text-white">
        © {new Date().getFullYear()} BaziStudio. All rights reserved.
      </div>
    </footer>
  );
}
