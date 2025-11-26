// components/Hero.jsx
"use client";
import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="w-full bg-[#463261] py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Text content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#F9FAFB] mb-6">
            Where design meets code.
          </h1>
          <p className="text-[#463261] font-inter text-lg md:text-xl mb-8">
            High-quality UI/UX, Figma to Code, and modern web experiences — built with precision, creativity, and speed.
          </p>
          <Button size="lg" onClick={() => alert("Get Started clicked!")}>
            Get Started
          </Button>
        </div>

        {/* Image / Placeholder */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full h-64 md:h-96 bg-gradient-to-r from-[#1003E8] to-[#F2730A] rounded-2xl shadow-lg flex items-center justify-center text-white font-poppins text-2xl">
            Your Design / Code Illustration
          </div>
        </div>

      </div>
    </section>
  );
}
