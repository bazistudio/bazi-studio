'use client'
import ProjectCard from '../../components/ProjectCard';

export default function Projects() {

  // Projects data
  const projects = [
    {
      title: "BaziStudio Website",
      description: "Portfolio platform showcasing design + code services and AI integrations.",
      category: "Portfolio Website",
      technologies: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js"],
      status: "Live",
      image: "/images/project1.jpg",
      link: "#"
    },
    {
      title: "Profit Pulse Calculator",
      description: "Web app for financial calculations and profit analysis.",
      category: "Web App",
      technologies: ["Next.js", "JavaScript", "Tailwind CSS"],
      status: "Live",
      image: "/images/project2.jpg",
      link: "#"
    },
    {
      title: "Aero AI Dashboard",
      description: "AI-powered dashboard for analytics and visualizations.",
      category: "Dashboard",
      technologies: ["Next.js", "Tailwind CSS", "Python", "Recharts"],
      status: "In Progress",
      image: "/images/project3.jpg",
      link: "#"
    },
    {
      title: "Smart Work Strategy System",
      description: "Framework for scaling services into digital assets",
      category: "Strategy & Systems",
      technologies: ["Figma", "Python", "Next.js", "AI Integration"],
      status: "Active Development",
      image: "/images/project4.jpg",
      link: "#"
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] px-4 md:px-12 py-12 pt-32">

      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1003E8] mb-4">
          All Projects
        </h1>
        <p className="text-[#463261] font-inter text-lg md:text-xl">
          A showcase of live, ongoing, and upcoming projects. Each crafted with modern design and clean code.
        </p>
      </section>

      <section className="max-w-7xl mx-auto">
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
    </div>
  );
}
