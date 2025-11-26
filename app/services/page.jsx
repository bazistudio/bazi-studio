'use client'

export default function Services() {
  const services = [
    {
      title: "UI/UX Design",
      description: "Crafting clean, modern, and user-friendly interfaces that enhance user experience.",
      icon: "🎨"
    },
    {
      title: "Figma to Code",
      description: "Convert your Figma designs into fully functional, responsive websites and apps.",
      icon: "💻"
    },
    {
      title: "Full Stack Development",
      description: "Building scalable web applications using Next.js, React, Node.js, and databases.",
      icon: "⚡"
    },
    {
      title: "Branding & Strategy",
      description: "Modern branding, identity design, and digital strategy for startups and businesses.",
      icon: "🚀"
    },
    {
      title: "Dashboard & SaaS Apps",
      description: "Custom dashboards, analytics platforms, and SaaS products tailored to your needs.",
      icon: "📊"
    },
    {
      title: "AI Integration",
      description: "Leverage AI to automate tasks, enhance UX, and deliver smarter web experiences.",
      icon: "🤖"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] px-4 md:px-12 py-12 pt-32">

      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1003E8] mb-4">
          Our Services
        </h1>
        <p className="text-[#463261] font-inter text-lg md:text-xl">
          From design to development and AI-powered solutions, we provide services to help you succeed online.
        </p>
      </section>

      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-poppins font-semibold text-[#F2730A] mb-2">{service.title}</h3>
            <p className="text-[#463261] font-inter text-sm">{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
