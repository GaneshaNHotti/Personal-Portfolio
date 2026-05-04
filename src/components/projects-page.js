"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Lock, ArrowUpRight, MessagesSquare, Server, Thermometer, BarChart3, Database, Wrench, ChevronDown } from "lucide-react";

const projects = [
  {
    id: 1,
    type: "professional",
    title: "ISS Thermal Data Analyzer",
    org: "Boeing India Private Limited",
    description:
      "Enterprise-grade PyQt6 desktop application processing multi-format thermal datasets (CSV, Excel, TXT) for International Space Station thermal management. Features a multi-threaded validation pipeline, modular MVC architecture with factory pattern, and a real-time Matplotlib/Seaborn visualization engine — reducing data processing time by 80% and enabling engineers to identify temperature anomalies 60% faster.",
    bullets: [
      "Architected enterprise-grade PyQt6 desktop application processing multi-format thermal datasets (CSV, Excel, TXT) with multi-threaded validation pipeline, reducing data processing time by 80% for ISS thermal engineers analyzing mission-critical temperature violations.",
      "Implemented modular MVC architecture with factory pattern for UI components and abstract export interfaces, enabling seamless integration of 10+ analysis modules (timeline, heat rate, case matrix) while maintaining 95% code reusability across thermal analysis workflows.",
      "Developed real-time data visualization engine using Matplotlib/Seaborn with custom plot widgets for scatter plots, line charts, and thermal exceedance analysis, enabling engineers to identify temperature anomalies 60% faster during mission operations.",
      "Built robust validation framework with pandas-based data cleaning and multi-threaded file processing, automatically detecting and handling corrupted thermal datasets while maintaining data integrity across 1000+ ISS mission files.",
      "Engineered comprehensive export system supporting PDF reports and Excel matrices with customizable formatting, streamlining thermal analysis documentation workflow and reducing report generation time from hours to minutes for mission-critical deliverables.",
    ],
    tech: ["Python", "PyQt6", "Pandas", "Matplotlib", "Seaborn", "Multi-threading", "MVC", "Factory Pattern"],
    liveUrl: null,
    githubUrl: null,
    Icon: Thermometer,
    note: "Proprietary — code is confidential",
    colSpan: "lg:col-span-1",
    featured: true,
  },
  {
    id: 2,
    type: "professional",
    title: "Advanced Metrology Analytics (AMA)",
    org: "Boeing India Private Limited",
    description:
      "11-microservice analytics platform serving metrology engineers via a React/Redux SPA backed by 9+ Python Flask REST APIs. Delivers Statistical Process Control (SPC) with UCL-based alerting, Poisson anomaly detection (MPOP) on rolling 30-day windows, Weibull/Log-Normal Life Cycle Cost modeling, NLP-powered calibration note analysis, and an AI-powered CMIS summary service — all with GitLab CI/CD, role-based access control, and 25+ centralized API endpoints.",
    bullets: [
      "Architected and developed an 11-microservice analytics platform serving metrology engineers, designing a decoupled Flask API layer (SPC, WordCloud, Life Cycle Cost, Reliability, Alert Generation, CMIS Summary, Message Alert System) behind a React/Redux SPA with role-based access control and CI/CD pipelines (GitLab CI with Pylint/Flake8/Bandit), reducing manual data analysis workflows and centralizing 25+ API endpoints into a single tool suite.",
      "Engineered an automated Statistical Process Control (SPC) pipeline that computed Upper Control Limits (UCL) using p-chart formulas, applied 10 Western Electric–style statistical rules across models/standards/procedures, and auto-generated Excel-based alert reports with scheduled email distribution — enabling proactive detection of out-of-tolerance equipment.",
      "Built a Poisson-distribution-based anomaly detection engine (MPOP) that calculated baseline OOT/SOOT/Defect rates over rolling 30-day windows, ranked clusters using a multi-criteria algorithm, and persisted ranked results to SQL Server via SQLAlchemy — automating a previously manual lead-generation process.",
      "Implemented a Life Cycle Cost Model API leveraging Weibull, Exponential, and Log-Normal survival analysis (via Lifelines) with AICc-based model selection to determine optimal equipment replacement age — providing data-driven capital planning recommendations to reliability engineers.",
      "Developed an NLP-powered text analytics module featuring n-gram word cloud generation and multi-condition text search across calibration notes (CMIS), integrated with interactive visualizations (Recharts, react-wordcloud, Nivo calendar heatmaps) — transforming unstructured maintenance notes into actionable insights.",
    ],
    tech: ["React 18", "Redux Toolkit", "Material UI", "Python", "Flask", "Pandas", "SciPy", "Lifelines", "SQL Server", "APScheduler", "Cloud Foundry"],
    liveUrl: null,
    githubUrl: null,
    Icon: BarChart3,
    note: "Proprietary — code is confidential",
    colSpan: "lg:col-span-2",
    featured: true,
  },
  {
    id: 3,
    type: "professional",
    title: "TICS — Engineering Data Platform",
    org: "Boeing India Private Limited",
    description:
      "Hybrid-cloud data mesh / lakehouse on AWS GovCloud & Azure GovCloud for flight test engineering data. Includes a React 19 / FastAPI quality metrics dashboard on AWS Lambda, an automated SQL Server → PostgreSQL migration pipeline with FK-aware UUID propagation across 15+ table hierarchies, multi-cloud ingestion workflows handling up to 67 TB, and a serverless analytics layer via AWS Glue + PySpark + Athena federated queries.",
    bullets: [
      "Architected a hybrid-cloud Engineering Data Platform (data mesh / lakehouse) on AWS GovCloud and Azure GovCloud, designing ETL pipelines, federated query layers, and tiered storage for flight test engineering data — with all infrastructure codified in Terraform and CloudFormation SAM templates.",
      "Built a Flight Configuration Quality Metrics dashboard (React 19 / MUI + FastAPI / Mangum on AWS Lambda) delivering monthly revision-reason pivot grids, drill-down detail views, multi-year release summaries, and CSV export — replacing manual spreadsheet reporting for engineering program stakeholders.",
      "Developed an automated legacy-to-cloud data migration pipeline (Python, pyodbc, psycopg2) that reads Excel-driven column mappings, extracts data from an on-premises SQL Server TICS database, generates FK-aware INSERT statements with UUID propagation across 15+ parent/child table hierarchies, and loads them into a normalized PostgreSQL data warehouse.",
      "Engineered multi-cloud data ingestion workflows including AWS DataSync, Azure azcopy batch jobs, robocopy-based flight test archive migration, and VHD page-blob transfers — handling datasets ranging from GBs to 67+ TB across GovCloud environments.",
      "Implemented a serverless analytics query layer using AWS Glue Crawlers + PySpark ETL (PostgreSQL → S3 Parquet), Athena federated queries via a Java-based Lambda connector, and a Glue Data Catalog as the central metadata store.",
    ],
    tech: ["Python", "FastAPI", "React 19", "PostgreSQL", "AWS Glue", "Athena", "Lambda", "Terraform", "PySpark", "Azure GovCloud", "MUI", "GitLab CI/CD"],
    liveUrl: null,
    githubUrl: null,
    Icon: Database,
    note: "Proprietary — code is confidential",
    colSpan: "lg:col-span-2",
    featured: true,
  },
  {
    id: 4,
    type: "professional",
    title: "Enterprise Total Productive Maintenance (ETPM)",
    org: "Boeing India Private Limited",
    description:
      "Full-stack asset health analytics platform computing a weighted composite health score (Availability, MTBF, RAV, Reactive Time, PM Compliance) across 4 rolling windows for thousands of manufacturing assets. Built a Python/Oracle ETL pipeline with a 5-stage MTBF grouper algorithm and Crow-AMSAA reliability modeling, an interactive React dashboard with 10+ cascading filters and 8 chart types, and an annual reporting module with Excel export for leadership.",
    bullets: [
      "Engineered a full-stack asset health scoring engine that computed a weighted composite health score (Availability 25%, MTBF/Crow-AMSAA Beta 25%, RAV 20%, Reactive Time 15%, PM On-Time Completion 15%) across 4 rolling time windows for thousands of critical manufacturing assets.",
      "Built a Python ETL pipeline that extracted work order, downtime, and cost data from an Oracle-based Maximo EAM system, performed complex overlapping-date resolution using a 5-stage grouper algorithm for MTBF calculation, and applied the Crow-AMSAA reliability growth model via multithreaded processing.",
      "Developed an interactive React dashboard with 10+ cascading multi-select filters, 8 distinct chart types using Recharts, and drill-down from fleet-level health tables to individual asset metric histories with Redux state persistence across navigation.",
      "Designed and exposed a Swagger-documented REST API (12+ endpoints) serving real-time and cached metric data, including per-asset time-series breakdowns for Availability, Reactive Time, Downtime contribution, RAV, and PM on-time completion.",
      "Implemented an annual reporting module that aggregated monthly health scores with year-over-year target tracking (25% gap-closure formula), multi-dimensional filtering, and Excel export capabilities — providing leadership with a single-pane view of maintenance effectiveness.",
    ],
    tech: ["Python", "Flask", "Pandas", "cx_Oracle", "SQLAlchemy", "React 18", "Redux", "Material UI", "Recharts", "Oracle DB", "SQL Server", "Cloud Foundry"],
    liveUrl: null,
    githubUrl: null,
    Icon: Wrench,
    note: "Proprietary — code is confidential",
    colSpan: "lg:col-span-1",
    featured: true,
  },
  // {
  //   id: 5,
  //   type: "personal",
  //   title: "Real Time Chat App",
  //   org: "Personal Project",
  //   description:
  //     "Real-time chat application with user authentication (JWT), live messaging via Socket.io, and a responsive Tailwind CSS frontend. Containerized with Docker.",
  //   tech: ["Python", "FastAPI", "React", "Socket.io", "Tailwind CSS", "Docker"],
  //   liveUrl: "#",
  //   githubUrl: "https://github.com/GaneshaNHotti/Chat-App",
  //   Icon: MessagesSquare,
  //   note: null,
  //   colSpan: "lg:col-span-1",
  //   featured: false,
  // },
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
  const [expanded, setExpanded] = useState(false);
  const { Icon } = project;
  const hasBullets = project.bullets && project.bullets.length > 0;

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between p-5 sm:p-7 pb-5">
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
          className="text-white/30 text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.07] self-start"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {project.org}
        </div>
      </div>

      <div className="h-px mx-7" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-white/40 text-sm leading-relaxed flex-1 mb-6">{project.description}</p>

        {/* Expandable bullet points */}
        {hasBullets && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 mb-4 text-xs font-medium text-white/30 hover:text-white/60 transition-colors duration-200 group self-start"
            >
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center w-5 h-5 rounded-lg border border-white/[0.1] group-hover:border-white/[0.2] transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <ChevronDown className="w-3 h-3" />
              </motion.span>
              {expanded ? "Hide Details" : "View Details"}
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden mb-4"
                >
                  <div
                    className="rounded-2xl border border-white/[0.06] p-4 space-y-3"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    {project.bullets.map((bullet, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="flex gap-3"
                      >
                        <div
                          className="w-0.5 shrink-0 rounded-full mt-1"
                          style={{ background: "rgba(255,255,255,0.15)", minHeight: "16px" }}
                        />
                        <p className="text-white/35 text-xs leading-relaxed">{bullet}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

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
    <section className="min-h-screen bg-transparent px-4 md:px-6 py-24 relative overflow-hidden flex items-center">

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

        {/* Bento grid: ISS(1)+AMA(2) | TICS(2)+ETPM(1) | Chat App(1) */}
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
