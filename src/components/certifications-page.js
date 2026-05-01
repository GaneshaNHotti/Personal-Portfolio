"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, BookOpen, Plus } from "lucide-react";

const items = [
  {
    id: 1,
    type: "education",
    title: "Bachelor of Engineering",
    subtitle: "Information Science & Engineering",
    issuer: "MS Ramaiah Institute of Technology",
    year: "2022",
    description:
      "Four-year undergraduate program covering data structures, algorithms, databases, operating systems, and software engineering fundamentals.",
    Icon: GraduationCap,
    colSpan: "lg:col-span-2",
  },
  {
    id: 2,
    type: "certification",
    title: "Microsoft Azure Fundamentals",
    subtitle: "AZ-900",
    issuer: "Microsoft",
    year: "2023",
    description:
      "Core Azure cloud concepts, services, security, privacy, compliance, and Azure pricing and support.",
    Icon: Award,
    colSpan: "lg:col-span-1",
  },
  {
    id: 3,
    type: "learning",
    title: "Continuous Learning",
    subtitle: "Always expanding",
    issuer: "Self-directed",
    year: "Ongoing",
    description:
      "Regularly exploring new tools and techniques — currently deepening knowledge in cloud-native patterns, distributed systems, and AI integration.",
    Icon: BookOpen,
    colSpan: "lg:col-span-1",
  },
  {
    id: 4,
    type: "placeholder",
    title: "More Coming",
    subtitle: "In progress",
    issuer: "—",
    year: "2025",
    description: "Additional certifications in progress. Check back soon.",
    Icon: Plus,
    colSpan: "lg:col-span-2",
  },
];

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{ background: "rgba(255,255,255,0.03)", filter: "blur(160px)", top: "5%", left: "-5%" }}
      animate={{ x: [0, 60, 0], y: [0, -50, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "rgba(255,255,255,0.02)", filter: "blur(130px)", bottom: "5%", right: "-5%" }}
      animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 7 }}
    />
  </div>
);

const CertCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { Icon } = item;
  const isPlaceholder = item.type === "placeholder";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={!isPlaceholder ? { y: -5 } : {}}
      className={`${item.colSpan} backdrop-blur-xl border rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
        isPlaceholder
          ? "border-dashed border-white/[0.06]"
          : "border-white/[0.08] hover:border-white/[0.14]"
      }`}
      style={{ background: isPlaceholder ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-7 pb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl border border-white/12 flex items-center justify-center shrink-0"
            style={{ background: isPlaceholder ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)" }}
          >
            <Icon className={`w-5 h-5 ${isPlaceholder ? "text-white/25" : "text-white/60"}`} />
          </div>
          <div>
            <p className="text-white/25 text-xs font-mono uppercase tracking-wider mb-0.5 capitalize">
              {item.type === "placeholder" ? "upcoming" : item.type}
            </p>
            <h3 className={`text-lg font-bold leading-tight ${isPlaceholder ? "text-white/30" : "text-white"}`}>
              {item.title}
            </h3>
          </div>
        </div>
        <div
          className="text-white/25 text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.06] shrink-0"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {item.year}
        </div>
      </div>

      <div className="h-px mx-7" style={{ background: "rgba(255,255,255,0.06)" }} />

      <div className="p-7 flex flex-col flex-1">
        <p className={`text-sm font-medium mb-1 ${isPlaceholder ? "text-white/25" : "text-white/55"}`}>
          {item.subtitle}
        </p>
        <p className={`text-xs mb-4 font-mono ${isPlaceholder ? "text-white/20" : "text-white/30"}`}>
          {item.issuer}
        </p>
        <p className={`text-sm leading-relaxed flex-1 ${isPlaceholder ? "text-white/25" : "text-white/40"}`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
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
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Education &amp; Certifications</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Credentials</span>
        </motion.div>

        {/* Bento: degree (col-2) + Azure cert (col-1) + Learning (col-1) + More (col-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <CertCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
