

"use client";
// app/page.js
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  

  
  // Sample projects data
  const projects = [
    {
      title: "BaziStudio Portfolio",
      description: "Our main portfolio project showing design + code services.",
      image: "/images/project1.jpg",
      link: "#",
    },
    {
      title: "Dashboard UI",
      description: "Custom admin dashboard design and development.",
      image: "/images/project2.jpg",
      link: "#",
    },
    {
      title: "Figma to Code Project",
      description: "Converting Figma designs to fully functional websites.",
      image: "/images/project3.jpg",
      link: "#",
    },
  ];

  return (
    
    <div>
      <Hero />

{/* Home Page Intro Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-4">
          Welcome to BaziStudio
        </h2>
        <p className="text-[#463261] font-inter text-lg md:text-xl mb-8">
          We craft modern web experiences by turning design into code. 
          Our mission is to help clients, students, and companies bring their ideas to life.
        </p>

        <h3 className="text-2xl font-poppins font-semibold text-[#F2730A] mb-3">
          Our Services
        </h3>
        <p className="text-[#463261] font-inter text-base md:text-lg mb-6">
          UI/UX Design, Figma to Code, Website Development, Dashboard Design, and Branding — everything you need to launch your project efficiently.
        </p>

        <p className="text-[#1003E8] font-inter text-base md:text-lg">
          Ready to start your project? Explore our portfolio or place an order now!
        </p>
      </section>




      {/* Projects Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-12 text-center">
          Our Projects
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

{/* Mobile Apps Projects Section */}
<section className="max-w-7xl mx-auto px-4 py-24">
  <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-12 text-center">
    Mobile Apps Projects
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Card 1 */}
    <ProjectCard
      title="App Project One"
      description="A fully functional mobile app with modern UI/UX, push notifications, and API integration."
      image="/images/mobile1.jpg"
      link="#"
      onOrder={() => alert("Ordering App Project One")}
    />

    {/* Card 2 */}
    <ProjectCard
      title="App Project Two"
      description="A productivity mobile app crafted for seamless performance and user experience."
      image="/images/mobile2.jpg"
      link="#"
      onOrder={() => alert("Ordering App Project Two")}
    />
  </div>
</section>

      
    </div>
  );
}
