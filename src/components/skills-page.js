"use client";

import { useRef } from "react";
import {
  SiAngular, SiJavascript, SiTypescript, SiTailwindcss,
  SiPython, SiFastapi, SiFlask, SiMysql,
  SiDocker, SiGit, SiLinux,
  SiPycharm, SiPostman, SiJira,
} from "react-icons/si";
import { TbBrandAzure, TbBrandVscode } from "react-icons/tb";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    colSpan: "lg:col-span-2",
    skills: [
      { name: "Angular",      Icon: SiAngular      },
      { name: "JavaScript",   Icon: SiJavascript   },
      { name: "TypeScript",   Icon: SiTypescript   },
      { name: "Tailwind CSS", Icon: SiTailwindcss  },
    ],
  },
  {
    title: "Backend",
    colSpan: "lg:col-span-2",
    skills: [
      { name: "Python",   Icon: SiPython   },
      { name: "FastAPI",  Icon: SiFastapi  },
      { name: "Flask",    Icon: SiFlask    },
      { name: "MySQL",    Icon: SiMysql    },
    ],
  },
  {
    title: "Cloud & DevOps",
    colSpan: "lg:col-span-2",
    skills: [
      { name: "Docker", Icon: SiDocker        },
      { name: "Azure",  Icon: TbBrandAzure    },
      { name: "Git",    Icon: SiGit           },
      { name: "Linux",  Icon: SiLinux         },
    ],
  },
  {
    title: "Tools",
    colSpan: "lg:col-span-2",
    skills: [
      { name: "VSCode",   Icon: TbBrandVscode      },
      { name: "PyCharm",  Icon: SiPycharm          },
      { name: "Postman",  Icon: SiPostman          },
      { name: "Jira",     Icon: SiJira             },
    ],
  },
];

const CategoryCard = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`${category.colSpan} backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.13] rounded-3xl p-6 transition-all duration-300`}
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-5">{category.title}</p>

      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => {
          const { Icon } = skill;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.06 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 cursor-default"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <Icon className="w-4 h-4 text-white/55" />
              </div>
              <span className="text-white/65 text-sm font-medium whitespace-nowrap">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

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
      animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
    />
  </div>
);

const AnimatedSkillsGrid = () => {
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
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Technical Skills</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Toolkit</span>
        </motion.div>

        {/* 4-col grid: row1 Frontend(2)+Backend(2) | row2 DevOps(2)+Tools(2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AnimatedSkillsGrid;
