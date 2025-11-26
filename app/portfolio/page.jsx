'use client'
import ProjectCard from '../../components/ProjectCard';

export default function Portfolio() {

  // Running projects
  const projects = [
    {
      title: "BaziStudio Website",
      description: "My main portfolio platform showcasing design + code services, online orders, and future AI integrations.",
      category: "Portfolio Website",
      technologies: ["Next.js", "Tailwind CSS", "ShadCN UI", "MongoDB", "Node.js"],
      status: "Live",
      highlight: true,
      image: "/images/project1.jpg",
      link: "#"
    },
    {
      title: "Profit Pulse Calculator",
      description: "A custom-built web app for financial calculations and profit analysis.",
      category: "Web App",
      technologies: ["Next.js", "JavaScript", "Tailwind CSS"],
      status: "Live",
      image: "/images/project2.jpg",
      link: "#"
    },
    {
      title: "Aero AI Dashboard",
      description: "A modern AI dashboard for analytics and visualizations with real-time data.",
      category: "Dashboard",
      technologies: ["Next.js", "Tailwind CSS", "Python", "Recharts"],
      status: "In Progress",
      image: "/images/project3.jpg",
      link: "#"
    }
  ];

  // Future projects placeholder
  const futureProjects = [
    {
      title: "Smart Work Strategy System",
      description: "Complete framework for transitioning from services to scalable digital assets",
      category: "Strategy & Systems",
      technologies: ["Figma", "Python", "Next.js", "AI Integration"],
      status: "Active Development",
    },
    {
      title: "UI/UX Design System & Component Library",
      description: "Reusable design system with tokens, components, and accessibility guidelines",
      category: "Design System",
      technologies: ["Figma", "Photoshop", "Illustrator"],
      status: "Completed",
    },
    {
      title: "PDF Language Converter SaaS",
      description: "AI-powered document translation and conversion platform",
      category: "SaaS Product",
      technologies: ["Python", "React", "FastAPI", "AI"],
      status: "Development",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] px-4 md:px-12 py-12 pt-32">

      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1003E8] mb-4">
          My Portfolio
        </h1>
        <p className="text-[#463261] font-inter text-lg md:text-xl">
          Explore my ongoing projects, live products, and upcoming creations. Each project is crafted with precision, creativity, and scalability in mind.
        </p>
      </section>

      {/* Running Projects */}
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-poppins font-bold text-[#F2730A] mb-8 text-center">
          Running Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      </section>

      {/* Future Projects */}
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-8 text-center">
          Future Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
              <div>
                <h3 className="text-xl font-poppins font-semibold text-[#F2730A] mb-2">
                  {project.title}
                </h3>
                <p className="text-[#463261] font-inter text-sm mb-3">{project.description}</p>
                <p className="text-[#1003E8] font-inter text-sm font-semibold">
                  {project.category} | {project.status}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-[#DCF6DA] text-[#463261] font-inter text-xs px-2 py-1 rounded-xl">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
