// components/ProjectCard.jsx
"use client";
import React from "react";
import Button from "./Button";

export default function ProjectCard({ title, description, image, link, onOrder }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      )}
      <div className="p-6 flex flex-col">
        <h3 className="text-xl font-poppins font-bold text-[#1003E8] mb-2">
          {title}
        </h3>
        <p className="text-[#463261] font-inter mb-4">{description}</p>

        <div className="flex space-x-4 mt-auto">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#F2730A] text-[#DCF6DA] font-poppins rounded-xl px-4 py-2 shadow-md hover:bg-[#1003E8] hover:text-white transition-colors duration-200"
            >
              View Project
            </a>
          )}

          <Button size="md" onClick={onOrder || (() => alert("Order Now clicked!"))}>
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
