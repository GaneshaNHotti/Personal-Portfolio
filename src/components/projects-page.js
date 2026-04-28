"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock, ArrowUpRight, MessagesSquare, Server } from "lucide-react";

const projects = [
  {
    id: 1,
    type: "professional",
    title: "Aerospace Backend Systems",
    org: "Boeing India Private Limited",
    description:
      "Design and development of backend services supporting aerospace-grade applications. Built high-performance data processing pipelines, REST APIs, and containerized microservices for real-time data ingestion and processing.",
    tech: ["Python", "FastAPI", "Docker", "Linux", "Azure", "REST APIs"],
    liveUrl: null,
    githubUrl: null,
    Icon: Server,
    note: "Proprietary — code is confidential",
    colSpan: "lg:col-span-2",
    featured: true,
  },
  {
    id: 2,
    type: "personal",
    title: "Real Time Chat App",
    org: "Personal Project",
    description:
      "Real-time chat application with user authentication (JWT), live messaging via Socket.io, and a responsive Tailwind CSS frontend. Containerized with Docker.",
    tech: ["Python", "FastAPI", "React", "Socket.io", "Tailwind CSS", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/GaneshaNHotti/Chat-App",
    Icon: MessagesSquare,
    note: null,
    colSpan: "lg:col-span-1",
    featured: false,
  },
];

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{ background: "rgba(255,255,255,0.03)", filter: "blur(160px)", top: "10%", left: "-5%" }}
      animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "rgba(255,255,255,0.02)", filter: "blur(130px)", bottom: "10%", right: "-5%" }}
      animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
    />
  </div>
);

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const { Icon } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`${project.colSpan} backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.14] rounded-3xl overflow-hidden flex flex-col transition-all duration-300`}
      style={{
        background: "rgba(255,255,255,0.04)",
        boxShadow: hovered ? "0 0 50px rgba(255,255,255,0.05)" : "none",
      }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between p-7 pb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl border border-white/12 flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <Icon className="w-5 h-5 text-white/60" />
          </div>
          <div>
            <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-0.5">
              {project.type === "professional" ? "Professional" : "Personal"}
            </p>
            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
          </div>
        </div>
        <div
          className="text-white/30 text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.07] shrink-0"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {project.org}
        </div>
      </div>

      <div className="h-px mx-7" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-white/40 text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-xl text-xs border border-white/[0.08] text-white/40 font-mono"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action row */}
        {project.note ? (
          <div className="flex items-center gap-2 text-white/25 text-xs">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>{project.note}</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              onClick={() => project.liveUrl && project.liveUrl !== "#" && window.open(project.liveUrl, "_blank")}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </button>
            <button
              className="flex items-center justify-center h-9 w-10 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
              onClick={() => project.githubUrl && project.githubUrl !== "#" && window.open(project.githubUrl, "_blank")}
            >
              <Github className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AnimatedProjectsGrid = () => {
  return (
    <section className="min-h-screen bg-[#080808] px-4 md:px-6 py-24 relative overflow-hidden flex items-center">
      <BlobBackground />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-baseline justify-between border-b border-white/[0.06] pb-5"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Projects</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Portfolio</span>
        </motion.div>

        {/* Bento: Boeing (col-2) + Chat App (col-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <button
            onClick={() => window.open("https://github.com/GaneshaNHotti", "_blank")}
            className="w-full flex items-center justify-center gap-2 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15] rounded-3xl py-5 text-white/40 hover:text-white/70 text-sm font-medium transition-all duration-300 group"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            View all projects on GitHub
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default AnimatedProjectsGrid;
