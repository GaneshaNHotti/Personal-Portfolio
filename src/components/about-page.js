"use client";

import { motion } from "framer-motion";
import { Code, Zap, Terminal } from 'lucide-react';


const aboutLines = [
  "# Meet the Developer",
  "developer = {",
  '  "name": "Ganesha N Hotti",',
  '  "location": "Bangalore, India",',
  '  "role": "Software Engineer",',
  '  "experience": "3 Years",',
  '  "skills": ["Python", "JavaScript", "Angular", "React", "MySQL"],',
  '  "interests": ["Backend Dev", "Full Stack Dev", "Tech for Good"],',
  '  "currently": "Building scalable, future-ready solutions",',
  '  "status": "Available for new opportunities ✨"',
  "};",
  "",
  "print(developer)",
  "print('Always debugging life and software 🐞');",
];

const getLineColor = (line) => {
  if (line.startsWith("#")) return "text-green-400";
  if (line.includes("✨")) return "text-yellow-400";
  if (line.includes('"')) return "text-yellow-400";
  if (line.includes("[")) return "text-blue-400";
  if (line.includes("print")) return "text-purple-400";
  return "text-white";
};

const AboutTitle = () => (
  <div className="text-center mt-16 mb-10">
    <h2 className="text-4xl lg:text-6xl font-bold text-white font-mono text-white mb-4">
      <span className="text-white">self</span>
      <span className="text-blue-400">.About</span>
      <span className="text-purple-400">()</span>
    </h2>
    <p className="mt-2 text-green-400 font-mono text-sm lg:text-base tracking-wide">
        {"// Unpacking the developer behind the screen"}
    </p>
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full bg-gray-900/90 border border-green-500/30 rounded-xl shadow-xl backdrop-blur-lg p-6 font-mono"
      >
        <div className="flex items-center mb-4 space-x-2 text-emerald-400 border-b border-gray-700 pb-2">
          <Terminal className="w-5 h-5" />
          <span className="text-sm">~$ cat about_me.py</span>
        </div>

        <AboutTitle />

        <div className="space-y-2">
          {aboutLines.map((line, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className={`${getLineColor(line)} leading-relaxed`}
            >
              <span className="text-gray-600 select-none mr-3">{(idx + 1).toString().padStart(2, "0")}</span>
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
