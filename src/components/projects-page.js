"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Zap, Users, BarChart3 } from "lucide-react";
import { Button } from './ui/button';
import { Badge } from './ui/badge';


const BackgroundGradient = ({ children, className = "" }) => {
  return (
    <div
      className={`relative group ${className}`}
    >
      <div className="relative bg-gray-900 rounded-xl border border-gray-700">
        {children}
      </div>
    </div>
  );
};

const MatrixRain = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newDrops = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1,
      opacity: 0.1 + Math.random() * 0.3
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-green-400 font-mono text-xs"
          style={{ left: `${drop.x}%` }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [drop.opacity, 0]
          }}
          transition={{
            duration: 20 / drop.speed,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-1">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const MatrixBackground = () => {
  const [matrixItems, setMatrixItems] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      binary: Math.random().toString(2).substr(2, 8),
    }));
    setMatrixItems(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 z-0">
      {matrixItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-green-400 font-mono text-xs"
          style={{
            left: item.left,
            top: item.top,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: item.delay,
          }}
        >
          {item.binary}
        </motion.div>
      ))}
    </div>
  );
};



const projects = [
  {
    id: 1,
    title: "TBD",
    description: "TBD",
    image: "/api/placeholder/400/250",
    tech: ["TBD"],
    liveUrl: "#",
    githubUrl: "#",
    icon: Code,
    gradient: "from-emerald-500 to-blue-500"
  },
  {
    id: 2,
    title: "TBD",
    description: "TBD",
    image: "/api/placeholder/400/250",
    tech: ["TBD"],
    liveUrl: "#",
    githubUrl: "#",
    icon: Users,
    gradient: "from-blue-500 to-purple-500"
  },
  {
    id: 3,
    title: "TBD",
    description: "TBD",
    image: "/api/placeholder/400/250",
    tech: ["TBD"],
    liveUrl: "#",
    githubUrl: "#",
    icon: BarChart3,
    gradient: "from-purple-500 to-blue-500"
  }
];

const ProjectsTitle = () => (
  <div className="text-center mb-10">
    <h2 className="text-4xl lg:text-6xl font-bold text-white font-mono mb-4">
      <span className="text-white">build</span>
      <span className="text-blue-400">.Showcase</span>
      <span className="text-purple-400">()</span>
    </h2>
    <p className="mt-2 text-green-400 font-mono text-sm lg:text-base tracking-wide">
     {"// Real-world builds. Code that speaks louder than words."}
    </p>
  </div>
);


export const AnimatedProjectsGrid = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80" />
      {/* Floating Elements */}
      <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-20 left-20 text-green-400">
        <Code size={24} className="opacity-40" />
        </motion.div>
        <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-32 right-20 text-blue-400">
          <Zap size={20} className="opacity-40" />
          </motion.div>
      <MatrixBackground />
      <MatrixRain />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            <ProjectsTitle />
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="h-full min-h-[600px]"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <BackgroundGradient className="h-full">
                  <motion.div
                    className="p-6 h-full flex flex-col overflow-hidden"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative mb-6 overflow-hidden rounded-lg group flex-shrink-0">
                      <motion.div
                        className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${project.gradient} flex items-center justify-center`}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360 
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        {/* Animated overlay */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                      </motion.div>
                      
                      {/* Hover glow effect */}
                      <motion.div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-lg blur opacity-0 transition-opacity duration-300`}
                        animate={{ 
                          opacity: hoveredProject === project.id ? 0.3 : 0 
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col min-h-0">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300 flex-shrink-0">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed flex-shrink-0">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-6 flex-grow flex flex-col">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex-shrink-0">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2 content-start">
                          {project.tech.map((tech) => (
                            <motion.div
                              key={tech}
                              whileHover={{ 
                                scale: 1.05,
                                y: -2
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge 
                                variant="secondary"
                                className="bg-gray-800 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 font-mono text-xs whitespace-nowrap"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button 
                          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white border-0 group"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          Live Demo
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 group"
                        >
                          <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </BackgroundGradient>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-semibold px-8 py-3 group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              View All Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedProjectsGrid;