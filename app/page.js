"use client";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import { Sparkles, Code, Palette, Zap, Rocket, Shield, Users, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  // Sample projects data
  const projects = [
    {
      title: "BaziStudio Portfolio",
      description: "Modern portfolio showcasing our design and development capabilities with interactive animations.",
      image: "/images/project1.jpg",
      link: "#",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      rating: 4.9,
      timeline: "3 weeks",
      teamSize: "2 designers",
      featured: true
    },
    {
      title: "Dashboard UI Pro",
      description: "Advanced admin dashboard with real-time analytics, charts, and data visualization.",
      image: "/images/project2.jpg",
      link: "#",
      tags: ["React", "Recharts", "Firebase"],
      rating: 4.8,
      timeline: "4 weeks",
      teamSize: "3 developers",
      variant: "featured"
    },
    {
      title: "Figma to Code Pro",
      description: "Pixel-perfect conversion of complex Figma designs into responsive React components.",
      image: "/images/project3.jpg",
      link: "#",
      tags: ["Figma", "React", "TypeScript"],
      rating: 4.9,
      timeline: "2 weeks",
      teamSize: "1 specialist",
    },
  ];

  const mobileApps = [
    {
      title: "TaskFlow Pro",
      description: "AI-powered task management app with team collaboration, reminders, and progress tracking.",
      image: "/images/mobile1.jpg",
      link: "#",
      tags: ["React Native", "AI", "Firebase"],
      rating: 4.9,
      timeline: "8 weeks",
      teamSize: "4 members",
      variant: "mobile",
      featured: true
    },
    {
      title: "FitMind Wellness",
      description: "Mental wellness app with meditation guides, mood tracking, and personalized recommendations.",
      image: "/images/mobile2.jpg",
      link: "#",
      tags: ["Flutter", "HealthKit", "ML"],
      rating: 4.8,
      timeline: "10 weeks",
      teamSize: "5 members",
      variant: "mobile"
    },
  ];

  const services = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description: "Beautiful interfaces with user-centered design principles",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Figma to Code",
      description: "Pixel-perfect conversion from design to production code",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Web Development",
      description: "Modern websites with Next.js, React & Tailwind CSS",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Mobile Apps",
      description: "Cross-platform apps for iOS & Android",
      color: "from-green-500 to-emerald-500"
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Completed", icon: "🎯" },
    { value: "100%", label: "Client Satisfaction", icon: "⭐" },
    { value: "24/7", label: "Support Available", icon: "🛡️" },
    { value: "15+", label: "Technologies Used", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center relative">
        {/* Background decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">BaziStudio</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            We transform your creative visions into functional digital experiences. 
            Combining modern design with cutting-edge technology to deliver solutions that exceed expectations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-10 text-gray-900 dark:text-white">
            Our <span className="text-[#F2730A]">Services</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} w-fit mb-4`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                
                <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-current to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
          
          <p className="text-lg font-medium text-[#1003E8] dark:text-blue-400">
            Ready to start your project? Explore our portfolio or place an order now!
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group flex items-center gap-3 bg-gradient-to-r from-[#1003E8] to-[#463261] text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            Start Your Project
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="group flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-[#463261] text-[#463261] dark:text-gray-300 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#463261] hover:text-white dark:hover:bg-gray-700 transition-all duration-300">
            View Case Studies
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-[#1003E8] to-[#463261] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Check out some of our recent work that combines beautiful design with solid engineering
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
              tags={project.tags}
              rating={project.rating}
              timeline={project.timeline}
              teamSize={project.teamSize}
              variant={project.variant}
              featured={project.featured}
            />
          ))}
        </div>

        <div className="text-center">
          <button className="group flex items-center gap-2 mx-auto text-[#1003E8] dark:text-blue-400 font-semibold text-lg hover:gap-3 transition-all">
            View All Projects
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-800 dark:to-gray-700 text-orange-600 dark:text-orange-400 px-4 py-2 rounded-full mb-4">
            <Zap size={16} />
            <span className="text-sm font-semibold">Mobile Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mobile <span className="bg-gradient-to-r from-[#F2730A] to-orange-500 bg-clip-text text-transparent">Apps</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Native and cross-platform mobile applications built with modern frameworks
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {mobileApps.map((app, index) => (
            <ProjectCard
              key={index}
              title={app.title}
              description={app.description}
              image={app.image}
              link={app.link}
              tags={app.tags}
              rating={app.rating}
              timeline={app.timeline}
              teamSize={app.teamSize}
              variant={app.variant}
              featured={app.featured}
            />
          ))}
        </div>

        {/* App Development Features */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Why Our <span className="text-[#F2730A]">Mobile Apps</span> Stand Out
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-white w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Performance</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Native-like speed with optimized React Native
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Security</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Enterprise-grade encryption and data protection
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Support</h4>
              <p className="text-gray-600 dark:text-gray-300">
                24/7 maintenance and update support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1003E8] via-[#463261] to-[#F2730A] p-8 md:p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1003E8] px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Free Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                View Pricing Plans
              </button>
            </div>
            
            <div className="mt-8 text-white/70 text-sm">
              <Clock className="inline mr-2 w-4 h-4" />
              Response time: Usually within 1 hour
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}