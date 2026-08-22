"use client";
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: ButtonProps) {
  // size classes
  let sizeClasses = '';
  if (size === 'sm') sizeClasses = 'px-3 py-1.5 text-xs';
  else if (size === 'md') sizeClasses = 'px-4 py-2 text-sm';
  else if (size === 'lg') sizeClasses = 'px-6 py-3 text-lg';
  else sizeClasses = 'px-4 py-2 text-sm';

  // variant classes
  let variantClasses = '';
  if (variant === 'outline') {
    variantClasses = 'border border-[#DCF6DA] bg-transparent text-white hover:bg-white/10';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent text-white hover:bg-[#E6F2FF]/10';
  } else {
    // primary default
    variantClasses = 'bg-[#DCF6DA] text-[#463261] hover:bg-[#F2730A] hover:text-[#000000]';
  }

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        font-poppins 
        rounded-2xl 
        shadow-md 
        ${sizeClasses} 
        ${variantClasses}
        ${className}
        transform transition-all duration-150
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
