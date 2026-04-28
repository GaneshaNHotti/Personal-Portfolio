"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Software Engineer",
    org: "Boeing India Private Limited",
    period: "Aug 2022 – Present",
    duration: "3+ years",
    description:
      "Design and develop backend systems for aerospace-grade applications. Responsible for high-performance data processing pipelines, containerized services, and CI/CD integration across cross-functional teams.",
    highlights: ["Python", "FastAPI", "Docker", "Linux", "Azure", "REST APIs"],
    Icon: Briefcase,
    colSpan: "lg:col-span-3",
  },
  // {
  //   id: 2,
  //   type: "education",
  //   title: "Bachelor of Engineering",
  //   org: "MS Ramaiah Institute of Technology",
  //   period: "2019 – 2022",
  //   duration: "3 years",
  //   description:
  //     "Information Science & Engineering. Strong foundation in data structures, algorithms, software engineering, and systems design.",
  //   highlights: ["Information Science", "Software Engineering", "Algorithms"],
  //   Icon: GraduationCap,
  //   colSpan: "lg:col-span-1",
  // },
];

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[700px] h-[700px] rounded-full"
      style={{ background: "rgba(255,255,255,0.025)", filter: "blur(180px)", top: "10%", left: "50%", x: "-50%" }}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { Icon } = exp;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.14, type: "spring", stiffness: 90 }}
      whileHover={{ y: -5 }}
      className={`${exp.colSpan} backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.14] rounded-3xl overflow-hidden flex flex-col transition-all duration-300`}
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {/* Card header strip */}
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
              {exp.type === "work" ? "Work Experience" : "Education"}
            </p>
            <h3 className="text-lg font-bold text-white leading-tight">{exp.title}</h3>
          </div>
        </div>
        <div
          className="text-white/30 text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.07] shrink-0 mt-1"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {exp.period}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-7" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/25 shrink-0" />
          <span className="text-white/55 text-sm font-medium">{exp.org}</span>
        </div>

        <p className="text-white/40 text-sm leading-relaxed flex-1 mb-6">{exp.description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {exp.highlights.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-xl text-xs border border-white/[0.08] text-white/40 font-mono"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AnimatedExperienceTimeline = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="min-h-screen bg-[#080808] px-4 md:px-6 py-24 relative overflow-hidden flex items-center">
      <BlobBackground />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-baseline justify-between border-b border-white/[0.06] pb-5"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">My Journey</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Career</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AnimatedExperienceTimeline;
