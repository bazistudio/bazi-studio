"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      details: "bazistudio51@gmail.com",
      link: "mailto:bazistudio51@gmail.com",
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+923145154184",
      link: "tel:+923145154184",
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "+923145154184",
      link: "https://wa.me/923145154184",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] px-4 md:px-12 py-12 pt-32">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1003E8] mb-4">
          Get in <span className="text-[#F2730A]">Touch</span>
        </h1>
        <p className="text-lg md:text-xl font-inter text-[#463261]">
          Have a project or question? Reach out via email, phone, WhatsApp, or
          the form below. Let's connect!
        </p>
      </section>

      {/* Contact Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {contactMethods.map((method, index) => (
          <a
            key={index}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <span className="text-4xl mb-4">{method.icon}</span>
            <h3 className="font-poppins font-semibold text-xl mb-2">
              {method.title}
            </h3>
            <p className="font-inter text-[#463261]">{method.details}</p>
          </a>
        ))}
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-6 text-center">
          Send us a Message
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8]"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            required
            className="w-full p-3 border rounded-lg font-inter focus:outline-none focus:ring-2 focus:ring-[#1003E8]"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#DCF6DA] text-[#463261] font-poppins font-semibold rounded-2xl shadow-md hover:bg-[#F2730A] hover:text-white transition-colors transform active:scale-95"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </div>
  );
}
