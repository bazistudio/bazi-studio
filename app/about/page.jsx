"use client";
import { CheckCircle, Figma, Code2, Palette, Laptop, Wrench } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] px-4 md:px-12 py-12 pt-32">


      {/* Header Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-[#1003E8] mb-4">
          About Me
        </h1>

        <p className="text-lg md:text-xl text-[#463261] font-inter max-w-3xl mx-auto">
          I’m <span className="font-semibold text-[#1003E8]">Naveed Gul</span>, 
          founder of <span className="font-semibold text-[#F2730A]">BaziStudio</span> — 
          a modern digital studio delivering branding, UI/UX design, and full-stack MERN development.
        </p>
      </section>

      {/* My Story */}
      <section className="grid md:grid-cols-2 gap-12 mb-24 items-center">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-4">
            My Journey
          </h2>

          <p className="text-[#463261] font-inter text-lg leading-relaxed mb-4">
            My journey started with pure passion — turning simple design ideas into clean, 
            functional, and beautiful digital interfaces.
          </p>

          <p className="text-[#463261] font-inter text-lg leading-relaxed">
            Today, BaziStudio helps clients, creators, students, and startups transform
            their digital vision into pixel-perfect, high-performance products.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/about.jpg"
            alt="About Naveed"
            width={450}
            height={450}
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] mb-4 text-center">
          My Mission
        </h2>

        <p className="text-[#463261] font-inter text-lg max-w-3xl mx-auto text-center mb-10">
          To make premium design & development accessible — helping students, small businesses,
          and startups get modern digital experiences without complexity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            "Clarity",
            "Modern UI",
            "Performance",
            "Clean Code",
            "Scalability",
            "Professional Workflow",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/70 backdrop-blur-lg shadow-md p-4 rounded-xl"
            >
              <CheckCircle className="text-[#1003E8]" />
              <span className="font-inter text-lg text-[#463261]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section>
        <h2 className="text-3xl font-poppins font-bold text-[#1003E8] text-center mb-12">
          Tools I Work With
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Design Tools */}
          <div>
            <h3 className="text-2xl font-semibold text-[#F2730A] mb-5 flex items-center gap-2">
              <Palette /> Design Tools
            </h3>

            <ul className="space-y-3 text-[#463261] font-inter text-lg">
              <li className="flex items-center gap-3">
                <Figma /> Figma (UI/UX)
              </li>
              <li className="flex items-center gap-3">
                <Palette /> Adobe Illustrator
              </li>
              <li className="flex items-center gap-3">
                <Laptop /> Adobe Photoshop
              </li>
            </ul>
          </div>

          {/* Development Tools */}
          <div>
            <h3 className="text-2xl font-semibold text-[#F2730A] mb-5 flex items-center gap-2">
              <Code2 /> Development Tools
            </h3>

            <ul className="space-y-3 text-[#463261] font-inter text-lg">
              <li className="flex items-center gap-3">
                <Laptop /> Next.js
              </li>
              <li className="flex items-center gap-3">
                <Laptop /> React.js
              </li>
              <li className="flex items-center gap-3">
                <Laptop /> Tailwind CSS
              </li>
              <li className="flex items-center gap-3">
                <Wrench /> MongoDB / Firebase
              </li>
              <li className="flex items-center gap-3">
                <Wrench /> Node.js (basic)
              </li>
              <li className="flex items-center gap-3">
                <Laptop /> VS Code, GitHub, Postman
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
