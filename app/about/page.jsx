"use client";
import { useState } from "react";
import { 
  CheckCircle, Figma, Code2, Palette, Laptop, Wrench, 
  Zap, Target, Users, Globe, Rocket, Sparkles, 
  Award, TrendingUp, Shield, Heart, Star, ArrowRight,
  Clock, Mail, MapPin, BookOpen, Cpu, Database,
  Smartphone, Cloud, Terminal, GitBranch
} from "lucide-react";
import Image from "next/image";

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  const skills = {
    design: [
      { name: "Figma", level: 95, icon: <Figma className="w-5 h-5" /> },
      { name: "UI/UX Design", level: 90, icon: <Palette className="w-5 h-5" /> },
      { name: "Adobe Illustrator", level: 85, icon: <Smartphone className="w-5 h-5" /> },
      { name: "Adobe Photoshop", level: 80, icon: <BookOpen className="w-5 h-5" /> },
      { name: "Wireframing", level: 92, icon: <Target className="w-5 h-5" /> },
    ],
    development: [
      { name: "Next.js", level: 90, icon: <Cpu className="w-5 h-5" /> },
      { name: "React.js", level: 88, icon: <Code2 className="w-5 h-5" /> },
      { name: "Tailwind CSS", level: 95, icon: <Palette className="w-5 h-5" /> },
      { name: "JavaScript", level: 85, icon: <Terminal className="w-5 h-5" /> },
      { name: "MongoDB", level: 75, icon: <Database className="w-5 h-5" /> },
      { name: "Node.js", level: 70, icon: <Cloud className="w-5 h-5" /> },
      { name: "Git & GitHub", level: 85, icon: <GitBranch className="w-5 h-5" /> },
    ]
  };

  const values = [
    { icon: <Heart className="w-8 h-8" />, title: "Passion-Driven", description: "Every project is fueled by genuine enthusiasm" },
    { icon: <Shield className="w-8 h-8" />, title: "Quality First", description: "Uncompromising standards in every deliverable" },
    { icon: <Users className="w-8 h-8" />, title: "Client-Focused", description: "Your success is our primary metric" },
    { icon: <Zap className="w-8 h-8" />, title: "Fast Execution", description: "Efficient workflows for timely delivery" },
    { icon: <Sparkles className="w-8 h-8" />, title: "Innovation", description: "Staying ahead with modern technologies" },
    { icon: <TrendingUp className="w-8 h-8" />, title: "Growth Mindset", description: "Continuous learning and improvement" },
  ];

  const timeline = [
    { year: "2020", title: "Started Learning", description: "Began journey in web design and development" },
    { year: "2021", title: "First Projects", description: "Completed first client websites and designs" },
    { year: "2022", title: "Skills Expansion", description: "Mastered React, Next.js, and modern UI/UX" },
    { year: "2023", title: "BaziStudio Founded", description: "Launched studio to serve clients globally" },
    { year: "2024", title: "Growth Phase", description: "Expanded team and service offerings" },
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
            <Sparkles size={16} />
            <span className="text-sm font-semibold">The Story Behind</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">Me</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            I'm <span className="font-bold text-[#1003E8] dark:text-blue-400">Naveed Gul</span>, founder of{" "}
            <span className="font-bold text-[#F2730A]">BaziStudio</span> — a modern digital studio 
            delivering premium design and development solutions.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-300">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'story', label: 'My Story', icon: <BookOpen className="w-5 h-5" /> },
            { id: 'skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
            { id: 'values', label: 'Values', icon: <Heart className="w-5 h-5" /> },
            { id: 'journey', label: 'Journey', icon: <Rocket className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#1003E8] to-[#463261] text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1003E8] dark:hover:border-blue-500'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* My Story Section */}
      {activeTab === 'story' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
                <BookOpen size={16} />
                <span className="text-sm font-semibold">The Beginning</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From <span className="gradient-text">Passion</span> to Profession
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  My journey began with a simple fascination — turning creative ideas into 
                  beautiful, functional digital experiences. What started as a hobby quickly 
                  evolved into a professional pursuit.
                </p>
                <p>
                  I spent countless hours mastering design principles, learning programming 
                  languages, and understanding user psychology. Each project taught me 
                  something new, pushing me to improve continuously.
                </p>
                <p>
                  Today, BaziStudio represents the culmination of this journey — a studio 
                  dedicated to helping clients transform their digital visions into 
                  pixel-perfect, high-performance realities.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#F2730A]" />
                  <span className="text-gray-700 dark:text-gray-300">Remote · Worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-[#1003E8]" />
                  <span className="text-gray-700 dark:text-gray-300">Available 24/7</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-[#1003E8] to-[#F2730A] p-1">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#1003E8] to-[#F2730A] flex items-center justify-center mx-auto mb-6">
                        <span className="text-white text-4xl font-bold">NG</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Naveed Gul</h3>
                      <p className="text-gray-300">Founder & Lead Developer</p>
                      <div className="mt-6 flex justify-center gap-4">
                        <Award className="text-yellow-400" />
                        <Star className="text-blue-400" />
                        <Zap className="text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-[#F2730A] to-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                🚀 3+ Years Experience
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#1003E8] to-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                ⭐ 50+ Projects
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {activeTab === 'skills' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A balanced blend of design aesthetics and technical expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Design Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Design Expertise
                </h3>
              </div>
              
              <div className="space-y-6">
                {skills.design.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {skill.icon}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-purple-500/20"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Development Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Development Skills
                </h3>
              </div>
              
              <div className="space-y-6">
                {skills.development.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {skill.icon}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      {activeTab === 'values' && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide every project and interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-blue-500 to-cyan-500' :
                    index % 3 === 1 ? 'from-purple-500 to-pink-500' :
                    'from-orange-500 to-yellow-500'
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Journey Timeline */}
      {activeTab === 'journey' && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The timeline of growth, learning, and achievements
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent -translate-x-1/2"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Year */}
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1003E8] to-[#463261] flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
                      {item.year}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${
                      index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector dot */}
                  <div className="hidden md:block absolute left-1/2 top-12 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full -translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1003E8] via-[#463261] to-[#F2730A] p-8 md:p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              My Mission
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
              To make premium design & development accessible to everyone — helping students, 
              small businesses, and startups create modern digital experiences without the 
              complexity and high costs.
            </p>
            <button className="group bg-white text-[#1003E8] px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                Let's Work Together
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}