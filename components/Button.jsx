// components/Button.jsx
"use client";
import React from 'react';

export default function Button({ children, onClick, size = 'md', className = '' }) {
  // size classes
  let sizeClasses = '';
  if (size === 'md') sizeClasses = 'px-4 py-2 text-sm';
  else if (size === 'lg') sizeClasses = 'px-6 py-3 text-lg';
  else sizeClasses = 'px-5 py-2.5 text-base'; // default md

  return (
    <button
      onClick={onClick}
      className={`
        bg-[#DCF6DA] 
        text-[#463261]
        font-poppins 
        rounded-2xl 
        shadow-md 
        ${sizeClasses} 
        ${className}
        transform transition-all duration-150
        hover:bg-[#F2730A]
        hover:text-[#DCF6DA]
        active:scale-95
      `}
    >
      {children}
    </button>
  );
}
