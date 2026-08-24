"use client"

import { FolderOpen, Github, Globe, Figma, Clock, Calendar, Users, Building2, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function CaseStudyHero({ project }: { project: any }) {
  const techList = project.project_technologies?.map((pt: any) => pt.technologies?.name).filter(Boolean) || [];
  const categoryName = project.categories?.name || "System";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative pt-32 pb-20 px-6 max-w-4xl mx-auto text-center z-10"
    >
      
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
        <FolderOpen size={14} />
        <span className="uppercase tracking-widest text-xs">{categoryName}</span>
      </div>

      <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">
        {project.title}
      </h1>
      
      {project.impact_summary && (
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          {project.impact_summary}
        </p>
      )}

      {/* Professional Signals Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-left bg-muted/20 border border-border/50 rounded-2xl p-6">
        {project.role && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Role</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-2"><ShieldCheck size={14} className="text-primary"/> {project.role}</span>
          </div>
        )}
        {project.team_size && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Team Size</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-2"><Users size={14} className="text-primary"/> {project.team_size}</span>
          </div>
        )}
        {project.client_name && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Client</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-2"><Building2 size={14} className="text-primary"/> {project.client_name}</span>
          </div>
        )}
        {project.is_personal_project && !project.client_name && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Client</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-2"><Target size={14} className="text-primary"/> Independent Lab Project</span>
          </div>
        )}
        {project.duration && (
          <div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Duration</span>
            <span className="text-sm font-medium text-foreground flex items-center gap-2"><Clock size={14} className="text-primary"/> {project.duration}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {techList.map((tech: string) => (
          <span key={tech} className="px-3 py-1.5 bg-background text-muted-foreground text-sm rounded-lg border border-border/50 shadow-sm font-mono">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-primary text-primary-foreground px-8 py-3 flex items-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-1 transition-transform">
            <Globe size={18} /> Live Deployment
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-8 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform">
            <Github size={18} /> Source Code
          </a>
        )}
        {project.figma_url && (
          <a href={project.figma_url} target="_blank" rel="noopener noreferrer" className="btn-base bg-background border border-border text-foreground px-8 py-3 flex items-center gap-2 hover:bg-muted hover:-translate-y-1 transition-transform">
            <Figma size={18} /> Design Files
          </a>
        )}
      </div>
    </motion.div>
  )
}
