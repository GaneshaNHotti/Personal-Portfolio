"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Code, Code2, GraduationCap, Zap } from 'lucide-react';

/**
 * @typedef {Object} ExperienceItem
 * @property {number} id
 * @property {string} title
 * @property {string} company
 * @property {string} period
 * @property {string} description
 * @property {React.ReactNode} icon
 * @property {'left' | 'right'} side
 */

const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Boeing India Private Limited",
    period: "2022 - Present",
    description: "Backend development for aerospace systems and applications. Focused on high-performance computing and real-time data processing.",
    icon: <Code2 className="w-6 h-6" />,
    side: 'right'
  },
  {
    id: 2,
    title: "Bachelor of Engineering",
    company: "MS Ramaiah Institute of Technology",
    period: "2019 - 2022",
    description: "Graduated with a degree in Information Science & Engineering, specializing in software development and systems engineering.",
    icon: <GraduationCap className="w-6 h-6" />,
    side: 'left'
  }
];

const MatrixBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {Math.random().toString(2).substr(2, 8)}
        </motion.div>
      ))}
    </div>
  );
};

const TimelineCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: experience.side === 'left' ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className={`flex items-center w-full ${
        experience.side === 'left' ? 'justify-start pr-8 md:pr-12' : 'justify-end pl-8 md:pl-12'
      } mb-16`}
    >
      <div className={`w-full max-w-md ${experience.side === 'left' ? 'text-right' : 'text-left'}`}>
        <motion.div
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl
                     hover:border-green-400/50 transition-all duration-300 group"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-blue-500/0 to-purple-600/0 
                         group-hover:from-green-400/20 group-hover:via-blue-500/20 group-hover:to-purple-600/20 
                         rounded-lg transition-all duration-300" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-400/10 rounded-lg border border-green-400/30">
                {experience.icon}
              </div>
              <div className="font-mono text-xs text-green-400 bg-gray-800/50 px-2 py-1 rounded border border-green-400/30">
                {experience.period}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
              {experience.title}
            </h3>
            
            <h4 className="text-lg text-blue-400 mb-3 font-semibold">
              {experience.company}
            </h4>
            
            <p className="text-gray-300 leading-relaxed">
              {experience.description}
            </p>
            
            {/* Terminal cursor */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-green-400 ml-1 mt-2"
            />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const TimelineNode = ({ experience, index, progress }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });
  const isActive = progress > index / experiences.length;

  return (
    <motion.div
      ref={nodeRef}
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="absolute left-1/2 transform -translate-x-1/2 z-10"
      style={{ top: `${index * 25 + 12.5}%` }}
    >
      <motion.div
        animate={isActive ? {
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 20px rgba(34, 197, 94, 0.5)',
            '0 0 40px rgba(34, 197, 94, 0.8)',
            '0 0 20px rgba(34, 197, 94, 0.5)'
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
          isActive 
            ? 'bg-green-400 border-green-300 text-gray-900' 
            : 'bg-gray-800 border-gray-600 text-green-400'
        }`}
      >
        {experience.icon}
      </motion.div>
      
      {/* Pulse rings */}
      {isActive && (
        <>
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-blue-400"
          />
        </>
      )}
    </motion.div>
  );
};

export const AnimatedExperienceTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.onChange(setProgressValue);
    return unsubscribe;
  }, [progress]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 py-20 overflow-hidden"
    >
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

      <MatrixBackground />
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Experience<span className="text-green-400">.</span>
            <span className="text-blue-400">timeline</span>
            <span className="text-purple-400">()</span>
          </h2>
          <div className="font-mono text-green-400 text-sm">
            {"// Journey through the code matrix"}
          </div>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-700">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-400 via-blue-500 to-purple-600"
            style={{
              height: `${progressValue * 100}%`,
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
            }}
          />
        </div>

        {/* Timeline Items */}
        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative">
            <TimelineCard experience={experience} index={index} />
            <TimelineNode 
              experience={experience} 
              index={index} 
              progress={progressValue}
            />
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div 
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-1 h-32 bg-gray-700 rounded-full relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-green-400 rounded-full transition-all duration-300"
            style={{ height: `${progressValue * 100}%` }}
          />
        </div>
        <div className="text-xs text-green-400 font-mono mt-2 text-center">
          {Math.round(progressValue * 100)}%
        </div>
      </motion.div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/20 font-mono text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              delay: i * 2,
            }}
          >
            {['<>', '{}', '[]', '/>', '&&', '||', '=>', '::'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedExperienceTimeline;