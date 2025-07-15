"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Download, ArrowRight, Terminal, Code, Zap } from 'lucide-react';

const BackgroundBoxes = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${20 + Math.random() * 40}px`,
      height: `${20 + Math.random() * 40}px`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setBoxes(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
        {boxes.map((box, i) => (
          <motion.div
            key={i}
            className="absolute border border-green-500/20 rounded"
            style={{
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: box.duration,
              repeat: Infinity,
              delay: box.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TypingEffect = ({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    }, 50 + delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay]);

  return (
    <span className={`tracking-wide ${className}`}>
      <span style={{ fontFamily: 'monospace' }}>{displayText}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-green-400"
      >
        |
      </motion.span>
    </span>
  );
};



const CodeTerminal = () => {
  const code_lines = [
    "# Building the future, one line at a time",
    "developer = {",
    '    "name": "Ganesha N Hotti",',
    '    "role": "Software Engineer",',
    '    "languages": ["JavaScript", "Python", "C# Programming"],',
    '    "frameworks": ["Angular", "FASTApi", "FlaskApi"],',
    '    "passion": "Turning futuristic tech into everyday solutions",',
    '    "status": "Available for hire" ✨',
    "}",
    "",
    'developer.code();',
    '> Transforming ideas into reality...',
    '> Building scalable applications...',
    '> Innovating with AI integration...',
    '✅ Ready to collaborate!',
]
  const codeLines = code_lines.map(line => line.trim());
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < codeLines.length) {
          return prev + 1;
        }
        return 0; // Reset animation
      });
    }, 300);

    return () => clearInterval(interval);
  }, [codeLines.length]);

  const getLineColor = (line, index) => {
    if (line.startsWith('//')) return 'text-gray-500';
    if (line.includes('const') || line.includes('name:') || line.includes('role:')) return 'text-blue-400';
    if (line.includes('"')) return 'text-yellow-400';
    if (line.includes('✨') || line.includes('✅')) return 'text-purple-400';
    if (line.startsWith('>')) return 'text-green-400';
    if (line.includes('{') || line.includes('}') || line.includes(';')) return 'text-white';
    return 'text-gray-300';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-gray-900/90 backdrop-blur border border-green-500/30 rounded-lg p-6 font-mono text-sm shadow-2xl"
    >
      {/* Terminal Header */}
      <div className="flex items-center mb-4 pb-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center ml-4 text-gray-400">
          <Terminal size={16} className="mr-2" />
          <span>portfolio.py</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="space-y-1">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`${getLineColor(line, index)} leading-relaxed`}
          >
            <span className="text-gray-600 mr-3 select-none">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            {line}
            {index === visibleLines - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-400 ml-1"
              >
                |
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const ProgrammerHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <BackgroundBoxes />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 text-green-400"
      >
        <Code size={24} className="opacity-30" />
      </motion.div>
      
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-32 right-20 text-blue-400"
      >
        <Zap size={20} className="opacity-40" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-green-400 font-mono text-lg"
            >
              $ whoami
            </motion.div>
            {/* Main Heading */}
            <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  <TypingEffect text="Ganesha N Hotti" delay={800} />
                </span>
              </h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-2xl lg:text-3xl text-blue-400 font-semibold"
              >
                Software Engineer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
            >
              I specialize in building scalable full-stack web apps with modern UI/UX, AI integration, 
              and cloud-ready architecture. Let's bring innovation to life — one line of code at a time.
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 }}
              className="flex flex-wrap gap-3"
            >
              {['Python', 'Angular', 'JavaScript', 'Git', 'Azure', 'MySQL'].map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-800/50 border border-green-500/30 rounded-full text-green-400 text-sm font-mono"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white border-0 group transition-all duration-300 transform hover:scale-105"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-400 group transition-all duration-300"
              >
                Download Resume
                <Download className="ml-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Terminal */}
          <div className="relative">
            <CodeTerminal />
            
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-green-400/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-green-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProgrammerHero;