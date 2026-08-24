"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  let sizeClasses = "px-4 py-2 text-sm";
  if (size === "sm") sizeClasses = "px-3 py-1.5 text-xs";
  else if (size === "lg") sizeClasses = "px-6 py-3 text-base";

  let variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20";
  if (variant === "outline") {
    variantClasses = "border border-border bg-transparent text-foreground hover:bg-muted";
  } else if (variant === "ghost") {
    variantClasses = "bg-transparent text-foreground hover:bg-muted";
  } else if (variant === "secondary") {
    variantClasses = "bg-secondary text-white hover:bg-secondary/90 shadow-sm shadow-secondary/20";
  } else if (variant === "accent") {
    variantClasses = "bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/20";
  } else if (variant === "destructive") {
    variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm shadow-destructive/20";
  }

  return (
    <button
      onClick={onClick}
      className={`
        btn-base
        inline-flex items-center justify-center gap-2
        rounded-xl
        font-medium
        ${sizeClasses} 
        ${variantClasses}
        ${className}
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {icon && <span className="flex items-center shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
