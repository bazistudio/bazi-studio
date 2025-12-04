'use client'
import { Palette, Code, Cpu, Zap, TrendingUp, Brain, Rocket, Shield, Users, Clock, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "UI/UX Design",
      description: "Crafting clean, modern, and user-friendly interfaces that enhance user experience and drive conversions.",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      features: ["User Research", "Wireframing", "Prototyping", "User Testing"],
      duration: "2-4 weeks"
    },
    {
      title: "Figma to Code",
      description: "Pixel-perfect conversion of your Figma designs into fully functional, responsive websites and applications.",
      icon: <Code className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      features: ["React Components", "Responsive Design", "Animation", "Performance"],
      duration: "1-3 weeks"
    },
    {
      title: "Full Stack Development",
      description: "Building scalable web applications using modern stacks like Next.js, React, Node.js, and databases.",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      features: ["API Development", "Database Design", "DevOps", "Security"],
      duration: "4-12 weeks"
    },
    {
      title: "Branding & Strategy",
      description: "Modern branding, identity design, and digital strategy for startups and growing businesses.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      features: ["Logo Design", "Brand Guidelines", "Marketing Strategy", "Social Media"],
      duration: "3-6 weeks"
    },
    {
      title: "Dashboard & SaaS Apps",
      description: "Custom dashboards, analytics platforms, and SaaS products tailored to your business needs.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
      features: ["Real-time Analytics", "User Management", "Payment Integration", "Multi-tenancy"],
      duration: "6-16 weeks"
    },
    {
      title: "AI Integration",
      description: "Leverage AI to automate tasks, enhance user experience, and deliver smarter web applications.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
      features: ["Chatbots", "Predictive Analytics", "Automation", "Machine Learning"],
      duration: "4-8 weeks"
    }
  ];

  const processSteps = [
    { number: "01", title: "Discovery", description: "Understand your goals and requirements", icon: "🎯" },
    { number: "02", title: "Strategy", description: "Plan the approach and timeline", icon: "📋" },
    { number: "03", title: "Design", description: "Create wireframes and prototypes", icon: "🎨" },
    { number: "04", title: "Development", description: "Build and test the solution", icon: "⚡" },
    { number: "05", title: "Launch", description: "Deploy and monitor performance", icon: "🚀" },
    { number: "06", title: "Support", description: "Ongoing maintenance and updates", icon: "🛡️" },
  ];

  const benefits = [
    { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", description: "Projects completed in record time" },
    { icon: <Shield className="w-6 h-6" />, title: "Quality Assurance", description: "Rigorous testing and code reviews" },
    { icon: <Users className="w-6 h-6" />, title: "Team Collaboration", description: "Work with dedicated experts" },
    { icon: <Rocket className="w-6 h-6" />, title: "Scalable Solutions", description: "Built to grow with your business" },
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
            <span className="text-sm font-semibold">What We Offer</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            From design to development and AI-powered solutions, we provide comprehensive services 
            to help your business succeed in the digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group flex items-center gap-3 bg-gradient-to-r from-[#1003E8] to-[#463261] text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
              Get a Free Quote
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="group flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-[#463261] text-[#463261] dark:text-gray-300 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-[#463261] hover:text-white dark:hover:bg-gray-700 transition-all duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-500 hover:shadow-2xl"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1003E8]/10 to-[#F2730A]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="text-[#1003E8] dark:text-[#F2730A]">
                  {benefit.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
              
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#1003E8] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What We <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your specific business needs and goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Service header with gradient */}
              <div className={`relative h-2 bg-gradient-to-r ${service.color}`}>
                <div className="absolute top-2 right-4">
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#1003E8] dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Included Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Button */}
                <button className="group/btn w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:from-[#1003E8] hover:to-blue-600 dark:hover:from-[#1003E8] dark:hover:to-blue-600 text-gray-800 dark:text-gray-300 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    Learn More
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

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A systematic approach to ensure quality, transparency, and successful project delivery
          </p>
        </div>
        
        <div className="relative">
          {/* Process line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center group hover:border-[#1003E8] dark:hover:border-blue-500 transition-all duration-300 hover:scale-110">
                  <div className="text-center">
                    <div className="text-4xl mb-1">{step.icon}</div>
                    <div className="text-xs font-bold text-gray-500 dark:text-gray-400">{step.number}</div>
                  </div>
                </div>
                
                {/* Step content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector dot for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-3 h-3 translate-x-1/2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1003E8] via-[#463261] to-[#F2730A] p-8 md:p-12 text-center">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1003E8] px-8 py-3.5 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Schedule a Call
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300">
                Download Brochure
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No Hidden Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}