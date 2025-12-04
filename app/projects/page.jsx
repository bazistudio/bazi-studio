'use client'
import { useState, useEffect } from 'react';
import ProjectCard from '../../components/ProjectCard';
import { 
  Filter, Grid, List, Eye, Calendar, Users, 
  Sparkles, Trophy, TrendingUp, Zap, Globe,
  Code, Palette, Database, Smartphone, Cloud,
  Lock, ChartBar, ShoppingCart, Briefcase,
  Search, ArrowRight, Star, Award, Target,
  CheckCircle, MessageSquare, GitBranch, Server,
  Layers, Cpu, Terminal, PaintBucket,
  Brain, Shield, Truck, BookOpen, Heart
} from "lucide-react";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedStats, setAnimatedStats] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    technologies: 0
  });

  // Complete Projects Data
  const projects = [
    {
      title: "Nexus Pro Dashboard",
      description: "Advanced business intelligence dashboard with real-time analytics, predictive modeling, and automated reporting for enterprise clients.",
      category: "Business Intelligence",
      technologies: ["Next.js", "Python", "D3.js", "WebSocket", "Redis"],
      status: "Live",
      image: "/images/nexus-pro.jpg",
      link: "#",
      timeline: "5 months",
      teamSize: "6 specialists",
      rating: 4.9,
      tags: ["Analytics", "Enterprise", "Real-time"],
      featured: true,
      complexity: "Advanced",
      awards: ["Best BI Tool 2024"],
      stats: { clients: "25+", accuracy: "99.8%" }
    },
    {
      title: "Quantum Commerce Platform",
      description: "Next-generation e-commerce solution with AI-powered recommendations, AR product previews, and blockchain payment integration.",
      category: "E-commerce",
      technologies: ["React", "Node.js", "Blockchain", "AR", "MongoDB"],
      status: "Live",
      image: "/images/quantum-commerce.jpg",
      link: "#",
      timeline: "8 months",
      teamSize: "10 members",
      rating: 4.8,
      tags: ["E-commerce", "AI", "Blockchain", "AR"],
      featured: true,
      complexity: "Enterprise",
      awards: ["Innovation Award"],
      stats: { revenue: "$5M+", users: "150K+" }
    },
    {
      title: "HealthSync Pro",
      description: "Comprehensive healthcare management system with telemedicine, patient monitoring, and AI diagnostics assistance.",
      category: "Healthcare Tech",
      technologies: ["React Native", "Python", "WebRTC", "PostgreSQL", "TensorFlow"],
      status: "Live",
      image: "/images/healthsync.jpg",
      link: "#",
      timeline: "9 months",
      teamSize: "12 members",
      rating: 4.9,
      tags: ["Healthcare", "Mobile", "AI", "Security"],
      featured: true,
      complexity: "Enterprise",
      awards: ["HealthTech Excellence"],
      stats: { hospitals: "50+", patients: "100K+" }
    },
    {
      title: "LearnSphere Platform",
      description: "Interactive educational platform with adaptive learning, virtual classrooms, and AI-powered tutoring for global education.",
      category: "EdTech",
      technologies: ["Next.js", "WebRTC", "AI/ML", "GraphQL", "Docker"],
      status: "Live",
      image: "/images/learnsphere.jpg",
      link: "#",
      timeline: "7 months",
      teamSize: "8 members",
      rating: 4.7,
      tags: ["Education", "AI", "Real-time", "Scalable"],
      featured: false,
      complexity: "Advanced",
      awards: ["EdTech Innovation"],
      stats: { students: "500K+", courses: "1000+" }
    }
  ];

  // Filter categories
  const filters = [
    { id: 'all', name: 'All Projects', icon: <Globe className="w-4 h-4" />, count: projects.length },
    { id: 'featured', name: 'Featured', icon: <Sparkles className="w-4 h-4" />, count: projects.filter(p => p.featured).length },
    { id: 'live', name: 'Live Projects', icon: <CheckCircle className="w-4 h-4" />, count: projects.filter(p => p.status === 'Live').length },
    { id: 'enterprise', name: 'Enterprise', icon: <Briefcase className="w-4 h-4" />, count: projects.filter(p => p.complexity === 'Enterprise').length },
    { id: 'development', name: 'In Development', icon: <Code className="w-4 h-4" />, count: projects.filter(p => p.status === 'In Development' || p.status === 'Beta').length },
    { id: 'award', name: 'Award Winning', icon: <Trophy className="w-4 h-4" />, count: projects.filter(p => p.awards.length > 0).length },
  ];

  // Technology stack
  const technologies = [
    { name: "Next.js", projects: 8, icon: <Terminal className="w-6 h-6" /> },
    { name: "React", projects: 9, icon: <Layers className="w-6 h-6" /> },
    { name: "Python", projects: 6, icon: <Cpu className="w-6 h-6" /> },
    { name: "AI/ML", projects: 7, icon: <Brain className="w-6 h-6" /> },
    { name: "Blockchain", projects: 4, icon: <Lock className="w-6 h-6" /> },
    { name: "Cloud", projects: 9, icon: <Cloud className="w-6 h-6" /> },
    { name: "Mobile", projects: 5, icon: <Smartphone className="w-6 h-6" /> },
    { name: "Database", projects: 9, icon: <Database className="w-6 h-6" /> },
  ];

  // Industries
  const industries = ["Finance", "Retail", "Healthcare", "Education", "Environmental", "Banking", "Logistics", "Creative"];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'live') return project.status === 'Live';
    if (activeFilter === 'enterprise') return project.complexity === 'Enterprise';
    if (activeFilter === 'development') return project.status === 'In Development' || project.status === 'Beta';
    if (activeFilter === 'award') return project.awards.length > 0;
    return true;
  }).filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Animate stats on load - FIXED: Added dependencies
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        projects: projects.length,
        clients: 50,
        satisfaction: 100,
        technologies: technologies.length
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [projects.length, technologies.length]); // Added dependencies

  return (
    <div className="min-h-screen pt-16 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Portfolio Showcase</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="bg-linear-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover our diverse portfolio of digital solutions that have transformed businesses 
            and created exceptional user experiences across industries.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
            {[
              { value: animatedStats.projects, label: 'Projects', icon: <Briefcase className="w-6 h-6" /> },
              { value: animatedStats.clients, label: 'Happy Clients', icon: <Users className="w-6 h-6" /> },
              { value: `${animatedStats.satisfaction}%`, label: 'Satisfaction', icon: <Star className="w-6 h-6" /> },
              { value: animatedStats.technologies, label: 'Technologies', icon: <Code className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#1003E8]/10 to-[#F2730A]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="text-[#1003E8] dark:text-[#F2730A]">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
            {/* Search */}
            <div className="w-full lg:w-auto lg:flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by name, technology, or category..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-300 font-medium">View:</span>
              <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-[#1003E8] text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-[#1003E8] text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                onClick={() => setActiveFilter(filterItem.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                  activeFilter === filterItem.id
                    ? 'bg-linear-to-r from-[#1003E8] to-[#463261] text-white border-transparent shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1003E8] dark:hover:border-blue-500'
                }`}
              >
                {filterItem.icon}
                <span className="font-medium">{filterItem.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === filterItem.id 
                    ? 'bg-white/20' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {filterItem.count}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600 dark:text-gray-300">
            Showing <span className="font-bold text-[#1003E8] dark:text-blue-400">{filteredProjects.length}</span> of <span className="font-bold">{projects.length}</span> projects
            {searchTerm && (
              <span> for &quot;<span className="font-bold">{searchTerm}</span>&quot;</span>
            )}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Live</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Beta</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        {filteredProjects.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
            {filteredProjects.map((project, index) => (
              <div key={index} className="group">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  tags={[...project.tags, ...project.technologies.slice(0, 2)]}
                  rating={project.rating}
                  timeline={project.timeline}
                  teamSize={project.teamSize}
                  featured={project.featured}
                  variant={project.awards.length > 0 ? 'featured' : 'default'}
                  className="h-full"
                />
                
                {/* Project Details */}
                <div className="mt-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Target className="w-4 h-4" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Briefcase className="w-4 h-4" />
                      <span>{project.complexity}</span>
                    </div>
                    {project.awards.length > 0 && (
                      <div className="col-span-2 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs">{project.awards[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
              Try adjusting your search or filter criteria to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="inline-flex items-center gap-2 bg-linear-to-r from-[#1003E8] to-[#463261] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Eye className="w-5 h-5" />
              View All Projects
            </button>
          </div>
        )}
      </section>

      {/* Technology Stack */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="bg-linear-to-r from-[#1003E8] to-[#F2730A] bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-[#1003E8] dark:hover:border-blue-500 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#1003E8]/10 to-[#F2730A]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-[#1003E8] dark:text-[#F2730A]">
                  {tech.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {tech.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Used in {tech.projects} projects
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1003E8] via-[#463261] to-[#F2730A] p-8 md:p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your requirements and create a custom solution that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1003E8] px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start a Project
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                Request Portfolio
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Free Project Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>NDA Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}