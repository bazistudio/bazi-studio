"use client";
import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Send, Clock, CheckCircle, Sparkles, User, Mail as MailIcon, MessageSquare, ArrowRight, Zap } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", projectType: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      details: "bazistudio51@gmail.com",
      description: "For formal inquiries and detailed discussions",
      link: "mailto:bazistudio51@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      details: "+92 314 515 4184",
      description: "Quick calls for urgent matters",
      link: "tel:+923145154184",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      details: "+92 314 515 4184",
      description: "Instant messaging for quick queries",
      link: "https://wa.me/923145154184",
      color: "from-green-600 to-teal-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Location",
      details: "Remote · Worldwide",
      description: "Serving clients globally",
      link: "#",
      color: "from-purple-500 to-pink-500"
    },
  ];

  const projectTypes = [
    "UI/UX Design",
    "Web Development",
    "Mobile App",
    "Figma to Code",
    "Branding",
    "Consultation",
    "Other"
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
            <span className="text-sm font-semibold">Let's Connect</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="bg-gradient-to-r from-[#1003E8] via-[#463261] to-[#F2730A] bg-clip-text text-transparent">Touch</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Have a project or question? Reach out via email, phone, WhatsApp, or the form below. 
            Let's create something amazing together!
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free initial consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Flexible collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Gradient header */}
              <div className={`h-2 bg-gradient-to-r ${method.color}`}></div>
              
              <div className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {method.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {method.title}
                </h3>
                
                {/* Details */}
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {method.details}
                </p>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {method.description}
                </p>
                
                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                  <span>Contact now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/5 group-hover:to-white/10 transition-all duration-500 -z-10"></div>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Success Message */}
          {isSubmitted && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Send us a <span className="gradient-text">Message</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <MailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              {/* Subject & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select Project Type</option>
                    {projectTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8] focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-4 bg-gradient-to-r from-[#1003E8] to-[#463261] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
              
              {/* Privacy Note */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Your information is secure. We'll never share your details with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h3>
        
        <div className="space-y-6">
          {[
            {
              q: "What's your typical response time?",
              a: "We usually respond within 24 hours for initial inquiries. For urgent matters, WhatsApp is the fastest way to reach us."
            },
            {
              q: "Do you offer free consultations?",
              a: "Yes! We offer a free 30-minute consultation to discuss your project requirements and provide initial guidance."
            },
            {
              q: "What information should I include in my message?",
              a: "Please include project details, timeline, budget range, and any specific requirements or examples you have in mind."
            },
            {
              q: "Do you work with international clients?",
              a: "Absolutely! We work with clients from all over the world. All our services are delivered remotely."
            },
          ].map((faq, index) => (
            <div 
              key={index}
              className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {faq.q}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}