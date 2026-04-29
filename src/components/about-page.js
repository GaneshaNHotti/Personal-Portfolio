"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Zap, Building2 } from "lucide-react";

const stats = [
  { icon: Briefcase, label: "Experience",  value: "4 Years"  },
  { icon: Building2, label: "Employer",    value: "Boeing"    },
  { icon: MapPin,    label: "Location",    value: "Bangalore" },
  { icon: Zap,       label: "Status",      value: "Available" },
];

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{ background: "rgba(255,255,255,0.03)", filter: "blur(160px)", top: "5%", right: "-10%" }}
      animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "rgba(255,255,255,0.02)", filter: "blur(130px)", bottom: "5%", left: "-5%" }}
      animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 6 }}
    />
  </div>
);

const AboutSection = () => {
  return (
    <section className="min-h-screen bg-[#080808] px-4 md:px-6 py-24 relative overflow-hidden flex items-center">
      <BlobBackground />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-baseline justify-between border-b border-white/[0.06] pb-5"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">About Me</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Who I am</span>
        </motion.div>

        {/* Row 1 — Avatar card + Bio card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

          {/* Avatar card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="md:col-span-1 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-center"
            style={{ background: "rgba(255,255,255,0.04)", minHeight: "200px" }}
          >
            <div
              className="w-20 h-20 rounded-2xl border border-white/15 flex items-center justify-center text-2xl font-bold text-white select-none"
              style={{ background: "rgba(255,255,255,0.09)" }}
            >
              GNH
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Ganesha N Hotti</p>
              <p className="text-white/35 text-xs mt-0.5">Software Engineer</p>
            </div>
          </motion.div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="md:col-span-3 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-8 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="space-y-4">
              <p className="text-white/65 text-base leading-relaxed">
                Full Stack Developer with nearly{" "}
                <span className="text-white font-semibold">4 years of experience</span>{" "}
                focused on developing robust backend services and data-centric applications. Expert in{" "}
                <span className="text-white font-semibold">Python (FastAPI, Flask)and SQL Server</span>,
                with a proven track record of optimizing complex queries to improve application performance.
              </p>
              <p className="text-white/45 text-base leading-relaxed">
                Proficient in building intuitive user interfaces using{" "}
                <span className="text-white/65 font-semibold">React and Angular</span>{" "}
                to streamline internal workflows. Graduated from{" "}
                <span className="text-white/65">MS Ramaiah Institute of Technology</span> in Information
                Science &amp; Engineering — dedicated to writing clean, testable code and delivering
                production-ready features that solve real-world data challenges.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-6 pl-4 border-l-2 border-white/15">
              <p className="text-white/30 italic text-sm">
                &ldquo;Maybe, you can change the system too.&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Row 2 — 4 stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 + index * 0.07 }}
                whileHover={{ y: -4 }}
                className="backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.14] rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/12 flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <Icon className="w-4 h-4 text-white/55" />
                </div>
                <div>
                  <p className="text-white font-bold text-base sm:text-lg leading-tight">{stat.value}</p>
                  <p className="text-white/35 text-xs mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
