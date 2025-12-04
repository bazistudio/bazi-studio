// components/ProjectCard.jsx
"use client";
import React, { useState } from "react";
import Button from "./Button";
import { ExternalLink, Eye, ShoppingCart, Star, Calendar, Users, ArrowUpRight, Heart, Zap } from "lucide-react";

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  link, 
  onOrder,
  tags = [],
  rating = null,
  timeline = null,
  teamSize = null,
  variant = "default",
  featured = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Variant styles
  const variantStyles = {
    default: "bg-white dark:bg-gray-800",
    mobile: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700",
    featured: "bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 border-2 border-orange-200 dark:border-orange-900",
  };

  return (
    <div 
      className={`relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${variantStyles[variant]} ${
        featured ? "ring-2 ring-orange-500/20" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            <Zap size={12} />
            <span>FEATURED</span>
          </div>
        </div>
      )}

      {/* Like button */}
      <button
        onClick={handleLike}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label={isLiked ? "Unlike project" : "Like project"}
      >
        <Heart 
          size={20} 
          className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`}
        />
      </button>

      {/* Image container */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        {/* Image with hover zoom */}
        <img 
          src={image} 
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Tags overlay */}
        {tags.length > 0 && (
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View project overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center transition-all duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            <Eye size={18} />
            <span>Live Preview</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        {/* Title and rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#1003E8] dark:group-hover:text-blue-400 transition-colors flex-1 pr-4">
            {title}
          </h3>
          
          {rating && (
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold">{rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        {(timeline || teamSize) && (
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
            {timeline && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{timeline}</span>
              </div>
            )}
            {teamSize && (
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{teamSize}</span>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group/link"
          >
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#1003E8] hover:text-[#1003E8] dark:hover:border-blue-400 dark:hover:text-blue-400"
              icon={<ExternalLink size={18} />}
            >
              View Details
            </Button>
          </a>

          <Button
            onClick={onOrder || (() => alert(`Ordering ${title}`))}
            size="md"
            className="flex-1 justify-center bg-gradient-to-r from-[#F2730A] to-orange-500 hover:from-orange-500 hover:to-[#F2730A] shadow-lg hover:shadow-xl"
            icon={<ShoppingCart size={18} />}
          >
            Order Now
          </Button>
        </div>

        {/* Hover effect line */}
        <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#F2730A] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 -z-10"></div>
    </div>
  );
}

// Usage examples:
/*
// Basic card
<ProjectCard
  title="Dashboard UI"
  description="Modern admin dashboard with analytics"
  image="/images/project1.jpg"
  link="#"
/>

// With tags and rating
<ProjectCard
  title="E-commerce App"
  description="Full-featured online shopping platform"
  image="/images/project2.jpg"
  link="#"
  tags={["React", "Node.js", "MongoDB"]}
  rating={4.8}
  timeline="2 months"
  teamSize="3 members"
/>

// Featured mobile app
<ProjectCard
  title="TaskFlow Pro"
  description="AI-powered productivity app"
  image="/images/mobile1.jpg"
  link="#"
  variant="mobile"
  featured={true}
  tags={["React Native", "AI", "Firebase"]}
  rating={4.9}
/>
*/