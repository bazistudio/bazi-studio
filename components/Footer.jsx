// components/Footer.jsx
"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white/20 backdrop-blur-md text-[#463261] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-start">

        {/* Left Section: About / Remote Work */}
        <div className="space-y-4">
          <h2 className="text-2xl font-poppins font-bold text-[#1003E8]">BaziStudio</h2>
          <p className="font-inter text-base">
            We work remotely, delivering modern web & mobile projects for clients globally.
          </p>
        </div>

        {/* Center Section: Portfolio Links */}
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-poppins font-semibold text-[#F2730A]">Portfolio Links</h3>
          <div className="flex justify-center flex-wrap gap-4 font-inter">
            <Link href="https://www.behance.net" target="_blank" className="hover:text-[#F2730A]">Behance</Link>
            <Link href="https://www.fiverr.com" target="_blank" className="hover:text-[#F2730A]">Fiverr</Link>
            <Link href="https://www.upwork.com" target="_blank" className="hover:text-[#F2730A]">Upwork</Link>
            <Link href="https://github.com" target="_blank" className="hover:text-[#F2730A]">GitHub</Link>
          </div>
        </div>

        {/* Right Section: Social Media */}
        <div className="space-y-4 text-right">
          <h3 className="text-xl font-poppins font-semibold text-[#F2730A]">Follow Us</h3>
          <div className="flex justify-end space-x-6">
            <a href="https://facebook.com" target="_blank"><Facebook size={24} className="hover:text-[#1003E8]" /></a>
            <a href="https://instagram.com" target="_blank"><Instagram size={24} className="hover:text-[#1003E8]" /></a>
            <a href="https://twitter.com" target="_blank"><Twitter size={24} className="hover:text-[#1003E8]" /></a>
            <a href="https://github.com" target="_blank"><Github size={24} className="hover:text-[#1003E8]" /></a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm font-inter text-[#463261]">
        © {new Date().getFullYear()} BaziStudio. All rights reserved.
      </div>
    </footer>
  );
}
