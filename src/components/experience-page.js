"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ArrowUpRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "work",
    title: "Software Engineer",
    org: "Boeing India Private Limited",
    period: "Aug 2022 – Present",
    bullets: [
      "Architected a serverless FastAPI backend using Python and Pydantic to aggregate complex flight-configuration revision histories into hierarchical monthly KPIs.",
      "Implemented server-side SQL transformations and pandas pivoting to reduce frontend processing by 100%, significantly accelerating analyst workflows.",
      "Deployed the API using Mangum and AWS Lambda, integrating with AWS Glue/Athena ETL pipelines and Terraform for automated infrastructure management.",
      "Co-developed a React + Redux SPA to unify fragmented analytics tools, owning state management for SPC and Alerting modules to ensure consistent data flow.",
      "Engineered text-analytics microservices using Flask to summarize work orders and generate automated alerts, increasing early detection of failure modes.",
      "Standardized enterprise database connectivity by centralizing SQL utilities and YAML-driven API definitions, reducing production failures and simplifying deployments.",
      "Designed reliability and lifecycle cost modeling tools using Poisson-Pareto analysis to quantify asset risk and support data-driven maintenance prioritization.",
      "Engineered and deployed Angular-based features for Navigation Database Services, enhancing user workflows and interface efficiency.",
      "Developed GUI components using PyQt for ISS Thermal data visualization, achieving a 60% reduction in processing time.",
      "Maintained 92% code coverage by integrating Pytest for comprehensive testing, ensuring application stability and identifying issues early in development.",
    ],
    highlights: ["Python", "FastAPI", "Flask", "React", "Angular", "AWS Lambda", "SQL", "Pandas", "PyQt", "Pytest", "Terraform", "Redux"],
    Icon: Briefcase,
    colSpan: "lg:col-span-3",
  },
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
      className={`${exp.colSpan} backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden flex flex-col`}
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {/* Card header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between p-5 sm:p-7 pb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl border border-white/12 flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <Icon className="w-5 h-5 text-white/60" />
          </div>
          <div>
            <p className="text-white/30 text-xs font-mono uppercase tracking-wider mb-0.5">Work Experience</p>
            <h3 className="text-lg font-bold text-white leading-tight">{exp.title}</h3>
          </div>
        </div>
        <div
          className="text-white/30 text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.07] self-start"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {exp.period}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-7" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-5">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/25 shrink-0" />
          <span className="text-white/55 text-sm font-medium">{exp.org}</span>
        </div>

        {/* Bullet points — 2 columns on lg */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 flex-1 mb-6">
          {exp.bullets.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "rgba(255,255,255,0.25)" }}
              />
              <span className="text-white/45 text-sm leading-relaxed">{point}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
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
    <section className="min-h-screen bg-transparent px-4 md:px-6 py-24 relative overflow-hidden flex items-center">

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
