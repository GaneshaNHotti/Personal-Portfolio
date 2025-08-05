"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Code2, Database, Cloud, Terminal, Zap, Globe, Server, Layers, GitBranch, Code, FastForward, Webhook, 
  Container, FileCode2, SquareCode, SquarePi, MailPlus, SquareChartGantt, Wrench } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {number} level
 * @property {React.ReactNode} icon
 * @property {string} color
 * @property {string} description
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} title
 * @property {React.ReactNode} icon
 * @property {Skill[]} skills
 * @property {string} gradient
 */

const skillCategories = [
  {
    title: "Frontend Technologies",
    icon: <Code2 className="w-6 h-6" />,
    gradient: "from-green-400/20 to-emerald-600/20",
    skills: [
      { name: "Angular", level: 80, icon: <Code2 className="w-5 h-5" />, color: "#00ff41", description: "Component-based framework" },
      { name: "JavaScript", level: 75, icon: <Globe className="w-5 h-5" />, color: "#00d4aa", description: "Web scripting language" },
      { name: "TypeScript", level: 75, icon: <FileCode2 className="w-5 h-5" />, color: "#0099ff", description: "Type-safe development" },
      { name: "Tailwind CSS", level: 50, icon: <Layers className="w-5 h-5" />, color: "#06b6d4", description: "Responsive design systems" }
    ]
  },
  {
    title: "Backend Technologies",
    icon: <Server className="w-6 h-6" />,
    gradient: "from-blue-400/20 to-blue-600/20",
    skills: [
      { name: "Python", level: 90, icon: <Terminal className="w-5 h-5" />, color: "#ffff00", description: "Backend & automation" },
      { name: "Fast API", level: 60, icon: <FastForward className="w-5 h-5" />, color: "#00ff41", description: "High-speed APIs" },
      { name: "Flask API", level: 60, icon: <Webhook  className="w-5 h-5" />, color: "#00d4aa", description: "Lightweight backend" },
      { name: "MySQL", level: 70, icon: <Database className="w-5 h-5" />, color: "#00ff41", description: "Relational databases" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6" />,
    gradient: "from-purple-400/20 to-purple-600/20",
    skills: [
      { name: "Docker", level: 70, icon: <Container className="w-5 h-5" />, color: "#0099ff", description: "Containerization" },
      { name: "Azure", level: 35, icon: <Cloud className="w-5 h-5" />, color: "#ffaa00", description: "Cloud infrastructure" },
      { name: "Git", level: 90, icon: <GitBranch className="w-5 h-5" />, color: "#ff6600", description: "Version control" },
      { name: "Linux", level: 85, icon: <Terminal className="w-5 h-5" />, color: "#00ff41", description: "System administration" }
    ]
  },
  {
    title: "Tools",
    icon: <Wrench className="w-6 h-6" />,
    gradient: "from-yellow-400/20 to-orange-600/20",
    skills: [
      { name: "VSCode", level: 100, icon: <SquareCode className="w-5 h-5" />, color: "#ff6600", description: "Code editor" },
      { name: "PyCharm", level: 100, icon: <SquarePi className="w-5 h-5" />, color: "#00ff41", description: "Python IDE" },
      { name: "Postman", level: 100, icon: <MailPlus className="w-5 h-5" />, color: "#ffff00", description: "API testing tool" },
      { name: "Jira", level: 100, icon: <SquareChartGantt className="w-5 h-5" />, color: "#ff00ff", description: "Project management" }
    ]
  }
];


const SkillCard = ({ skill, index, categoryIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setTimeout(() => setProgressVisible(true), 300 + index * 100);
    }
  }, [isInView, controls, index]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: -15,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: categoryIndex * 0.1 + index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 overflow-hidden"
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(45deg, ${skill.color}10, ${skill.color}05, transparent)`
          }}
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%'
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0, repeatType: 'reverse' }}
        />

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(45deg, transparent, ${skill.color}40, transparent)`,
            opacity: 0
          }}
          animate={{
            opacity: isHovered ? [0, 1, 0] : 0,
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="mb-4 p-2 rounded-lg w-fit"
            style={{ 
              backgroundColor: `${skill.color}20`,
              boxShadow: `0 0 20px ${skill.color}30`
            }}
            animate={{
              boxShadow: isHovered 
                ? [`0 0 20px ${skill.color}30`, `0 0 30px ${skill.color}60`, `0 0 20px ${skill.color}30`]
                : `0 0 20px ${skill.color}30`
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            <motion.div
              style={{ color: skill.color }}
              animate={{ rotate: isHovered ? [0, 360] : 0 }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            >
              {skill.icon}
            </motion.div>
          </motion.div>

          {/* Skill name */}
          <motion.h3 
            className="text-lg font-bold text-white mb-2 font-mono"
            style={{ textShadow: `0 0 10px ${skill.color}50` }}
          >
            {skill.name}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 font-mono">
            {skill.description}
          </p>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm font-mono">Proficiency</span>
              <motion.span 
                className="text-white text-sm font-mono font-bold"
                style={{ color: skill.color }}
              >
                {progressVisible ? skill.level : 0}%
              </motion.span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full relative"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: progressVisible ? `${skill.level}%` : 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{
                    x: progressVisible ? ['0%', '100%'] : '0%'
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    background: `linear-gradient(90deg, transparent, white, transparent)`,
                    width: '30%'
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Floating particles */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                    opacity: 0
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Terminal cursor effect */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-4 bg-green-400"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

const CategoryHeader = ({ category, index }) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setTitleVisible(true), index * 200);
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${category.gradient} border border-white/10 backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className="text-green-400"
          animate={{ rotate: titleVisible ? 360 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {category.icon}
        </motion.div>
        <motion.h2 
          className="text-2xl font-bold text-white font-mono"
          style={{ textShadow: '0 0 10px #00ff4150' }}
        >
          {titleVisible && (
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              {category.title.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </motion.h2>
      </div>
    </motion.div>
  );
};

const SkillsTitle = () => (
  <div className="text-center mb-10">
    <h2 className="text-4xl lg:text-6xl font-bold text-white font-mono mb-4">
      <span className="text-white">developer</span>
      <span className="text-blue-400">.Skills</span>
      <span className="text-purple-400">()</span>
    </h2>
    <p className="mt-2 text-green-400 font-mono text-sm lg:text-base tracking-wide">
      {"// A breakdown of my technical stack and coding arsenal"}
    </p>
  </div>
);


export const AnimatedSkillsGrid = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const generatedShapes = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 20 + Math.random() * 10,
    }));
    setShapes(generatedShapes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80" />
              {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-20 left-20 text-green-400"
                    >
                      <Code size={24} className="opacity-40" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute bottom-32 right-20 text-blue-400"
                    >
                      <Zap size={20} className="opacity-40" />
                    </motion.div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SkillsTitle />
          <motion.div className="flex items-center justify-center space-x-2 text-green-400 text-xl font-mono">
            <Terminal className="w-6 h-6" />
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Executing skill_scan.exe...
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title}>
              <CategoryHeader category={category} index={categoryIndex} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={skillIndex}
                    categoryIndex={categoryIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal prompt at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 px-6 py-3 rounded-lg border border-green-400/30 font-mono text-green-400">
            <span>developer@portfolio:~$</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              |
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: shape.left,
              top: shape.top,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-20 h-20 border border-green-400 transform rotate-45" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSkillsGrid;