'use client'
import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { Rocket, Calendar, Zap, Target, Sparkles, Clock, CheckCircle, Code, Palette, Cpu, Brain, TrendingUp, ArrowRight, ExternalLink, Eye, Users, Star } from "lucide-react";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('running');

  // Running projects
  const runningProjects = [
    {
      title: "BaziStudio Website",
      description: "My main portfolio platform showcasing design + code services, online orders, and AI integrations with interactive features.",
      category: "Portfolio Website",
      technologies: ["Next.js", "Tailwind CSS", "ShadCN UI", "MongoDB", "Node.js", "Framer Motion"],
      status: "Live",
      highlight: true,
      image: "/images/project1.jpg",
      link: "#",
      timeline: "6 weeks",
      teamSize: "3 members",
      rating: 4.9,
      tags: ["Featured", "Web", "Responsive", "E-commerce"],
      featured: true,
      progress: 100
    },
    {
      title: "Profit Pulse Calculator",
      description: "Advanced financial web app for real-time profit analysis, forecasting, and interactive data visualization.",
      category: "Web App",
      technologies: ["Next.js", "JavaScript", "Tailwind CSS", "Chart.js", "Firebase"],
      status: "Live",
      image: "/images/project2.jpg",
      link: "#",
      timeline: "8 weeks",
      teamSize: "2 members",
      rating: 4.8,
      tags: ["Finance", "Analytics", "Dashboard"],
      featured: false,
      progress: 100
    },
    {
      title: "Aero AI Dashboard",
      description: "Modern AI-powered dashboard for analytics and visualizations with real-time data processing and predictive insights.",
      category: "Dashboard",
      technologies: ["Next.js", "Tailwind CSS", "Python", "Recharts", "OpenAI API"],
      status: "In Progress",
      image: "/images/project3.jpg",
      link: "#",
      timeline: "10 weeks",
      teamSize: "4 members",
      rating: 4.7,
      tags: ["AI", "Analytics", "Real-time"],
      featured: true,
      progress: 85
    },
  ];

  // Future projects
  const futureProjects = [
    {
      title: "Smart Work Strategy System",
      description: "Complete framework for transitioning from services to scalable digital assets with automation and AI integration.",
      category: "Strategy & Systems",
      technologies: ["Figma", "Python", "Next.js", "AI Integration", "Automation"],
      status: "Active Development",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      timeline: "Q2 2024",
      features: ["Automation", "AI Agents", "Workflow Engine"],
      progress: 45
    },
    {
      title: "UI/UX Design System & Component Library",
      description: "Reusable design system with tokens, components, and accessibility guidelines for consistent product development.",
      category: "Design System",
      technologies: ["Figma", "Photoshop", "Illustrator", "Storybook"],
      status: "Planning",
      icon: <Palette className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      timeline: "Q3 2024",
      features: ["200+ Components", "Dark Mode", "Accessibility"],
      progress: 20
    },
    {
      title: "PDF Language Converter SaaS",
      description: "AI-powered document translation and conversion platform supporting 50+ languages with high accuracy.",
      category: "SaaS Product",
      technologies: ["Python", "React", "FastAPI", "AI", "AWS"],
      status: "Development",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      timeline: "Q4 2024",
      features: ["50+ Languages", "Batch Processing", "API Access"],
      progress: 60
    },
    {
      title: "Mobile Fitness Tracker",
      description: "Cross-platform fitness app with workout tracking, nutrition planning, and social features.",
      category: "Mobile App",
      technologies: ["React Native", "Firebase", "HealthKit", "Redux"],
      status: "Research",
      icon: <Zap className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      timeline: "Q1 2025",
      features: ["Workout Plans", "Progress Tracking", "Social Feed"],
      progress: 10
    },
    {
      title: "E-commerce Analytics Platform",
      description: "Advanced analytics platform for e-commerce stores with customer insights and sales predictions.",
      category: "Analytics",
      technologies: ["Next.js", "Python", "PostgreSQL", "D3.js"],
      status: "Design",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      timeline: "Q2 2025",
      features: ["Real-time Dashboards", "Predictive Analytics", "Custom Reports"],
      progress: 30
    },
    {
      title: "AI Content Generation Suite",
      description: "Comprehensive suite for AI-powered content creation, including writing, design, and video.",
      category: "AI Tools",
      technologies: ["Python", "React", "OpenAI", "Stable Diffusion"],
      status: "Concept",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      timeline: "Q3 2025",
      features: ["Multi-format", "Team Collaboration", "API Integration"],
      progress: 5
    },
  ];

  // Stats
  const portfolioStats = [
    { label: 'Projects Completed', value: '15+', icon: <CheckCircle className="w-6 h-6" /> },
    { label: 'Ongoing Projects', value: runningProjects.length, icon: <Clock className="w-6 h-6" /> },
    { label: 'Future Projects', value: futureProjects.length, icon: <Calendar className="w-6 h-6" /> },
    { label: 'Technologies Used', value: '25+', icon: <Code className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-28">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
            <Rocket size={16} />
            <span className="text-sm font-semibold">Creative Portfolio</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">
              My Portfolio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore my ongoing projects, live products, and upcoming creations. 
            Each project is crafted with precision, creativity, and scalability in mind.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            {portfolioStats.map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1003E8]/10 to-[#F2730A]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-[#1003E8] dark:text-[#F2730A]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('running')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'running'
                ? 'bg-gradient-to-r from-[#1003E8] to-[#463261] text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1003E8] dark:hover:border-blue-500'
            }`}
          >
            <Rocket className="w-5 h-5" />
            Running Projects
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
              {runningProjects.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('future')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'future'
                ? 'bg-gradient-to-r from-[#F2730A] to-orange-500 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#F2730A] dark:hover:border-orange-500'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Future Projects
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
              {futureProjects.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#463261] to-purple-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#463261] dark:hover:border-purple-500'
            }`}
          >
            <Target className="w-5 h-5" />
            All Projects
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
              {runningProjects.length + futureProjects.length}
            </span>
          </button>
        </div>
      </section>

      {/* Running Projects Section */}
      {activeTab !== 'future' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#1003E8] to-[#463261] bg-clip-text text-transparent">
                Running Projects
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Currently active projects that are live or in development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {runningProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                tags={[...project.tags, ...project.technologies.slice(0, 2)]}
                rating={project.rating}
                timeline={project.timeline}
                teamSize={project.teamSize}
                featured={project.featured}
              />
            ))}
          </div>
        </section>
      )}

      {/* Future Projects Section */}
      {activeTab !== 'running' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#F2730A] to-orange-500 bg-clip-text text-transparent">
                Future Projects
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Upcoming projects and ideas in the pipeline
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureProjects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Progress bar */}
                <div className="h-2 bg-gray-100 dark:bg-gray-700">
                  <div 
                    className={`h-full bg-gradient-to-r ${project.color} transition-all duration-1000`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {project.icon}
                    </div>
                  </div>
                  
                  {/* Title and status */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#1003E8] dark:group-hover:text-blue-400 transition-colors flex-1 pr-4">
                      {project.title}
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      project.status === 'Active Development' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      project.status === 'Planning' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                      project.status === 'Development' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {project.description}
                  </p>
                  
                  {/* Category and timeline */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span className="font-medium">{project.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.timeline}
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>Progress</span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="group/btn w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-[#1003E8] hover:to-blue-600 dark:hover:from-[#1003E8] dark:hover:to-blue-600 text-gray-800 dark:text-gray-300 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300">
                    <span className="flex items-center justify-center gap-2">
                      Track Progress
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Projects Combined View */}
      {activeTab === 'all' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#463261] to-purple-600 bg-clip-text text-transparent">
                Complete Portfolio
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              All projects combined — showing the full scope of my work and future plans
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1003E8] via-[#463261] to-[#F2730A] p-8 md:p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want to Collaborate?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's work together on your next project or bring one of my future ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1003E8] px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Collaboration
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                View Case Studies
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Team Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Quality Assurance</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Transparent Process</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}