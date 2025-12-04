// components/Hero.jsx
"use client";
import React from "react";
import Button from "./Button";
import { ArrowRight, Sparkles, Code, Palette, Zap, ChevronRight } from "lucide-react";

export default function Hero() {
  const handleGetStarted = () => {
    // Replace with actual navigation
    window.scrollTo({
      top: document.getElementById('services')?.offsetTop || 800,
      behavior: 'smooth'
    });
  };

  const handleViewProjects = () => {
    // Replace with actual navigation
    window.scrollTo({
      top: document.getElementById('portfolio')?.offsetTop || 1200,
      behavior: 'smooth'
    });
  };

  const features = [
    { icon: <Code size={20} />, text: "Clean Code" },
    { icon: <Palette size={20} />, text: "Modern Design" },
    { icon: <Zap size={20} />, text: "Fast Delivery" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#463261] via-[#382950] to-[#2a1f3f] py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#1003E8]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-[#F2730A]/20 to-transparent rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px),
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#F2730A] rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#1003E8] rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>

      <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-[#F2730A]" />
            <span className="text-sm font-medium text-white">
              Trusted by 100+ clients worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Where design
            </span>
            <span className="block">
              meets{" "}
              <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">
                code.
              </span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
            We transform your ideas into stunning, functional digital experiences. 
            Specializing in UI/UX design, Figma to code conversion, and modern web development.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 group hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-[#F2730A] group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
            <Button
              onClick={handleGetStarted}
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              className="group min-w-[200px]"
            >
              Start Project
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={handleViewProjects}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
            >
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Right: Visual Element */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full max-w-2xl mx-auto">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-[#1003E8] via-[#382950] to-[#F2730A] rounded-3xl p-1 shadow-2xl shadow-purple-900/30">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 overflow-hidden">
                {/* Code Editor Background */}
                <div className="absolute inset-0 opacity-10">
                  <pre className="text-xs font-mono p-4">
{`// BaziStudio - Modern Web Solutions
function createProject() {
  const design = getFigmaDesign();
  const code = convertToCode(design);
  const website = deploy(code);
  return success(website);
}

// Let's build something amazing!
startProject({ 
  client: "You", 
  tech: ["Next.js", "React", "Tailwind"],
  deadline: "ASAP" 
});`}
                  </pre>
                </div>
                
                {/* Floating Elements */}
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1003E8] to-blue-700 flex items-center justify-center">
                      <Palette className="text-white" size={24} />
                    </div>
                    <div className="text-4xl text-gray-300">→</div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F2730A] to-orange-600 flex items-center justify-center">
                      <Code className="text-white" size={24} />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Design → Code → Launch
                    </h3>
                    <p className="text-gray-300 mb-6">
                      From concept to deployment in record time
                    </p>
                    
                    {/* Animated Progress Bar */}
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                      <div className="absolute h-full w-1/2 bg-gradient-to-r from-[#1003E8] to-[#F2730A] rounded-full animate-[shimmer_2s_infinite]"></div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      Transforming designs since 2023
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#F2730A] to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg animate-float">
              🚀 Fast Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}