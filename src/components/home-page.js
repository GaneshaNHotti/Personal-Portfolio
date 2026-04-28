"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Download, ArrowRight } from 'lucide-react';

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[700px] h-[700px] rounded-full"
      style={{ background: "rgba(255,255,255,0.03)", filter: 'blur(180px)', top: '-20%', left: '-10%' }}
      animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "rgba(255,255,255,0.02)", filter: 'blur(140px)', bottom: '-10%', right: '-5%' }}
      animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
    />
  </div>
);

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((i) => i + 1);
      }
    }, 65);
    return () => clearTimeout(timeout);
  }, [currentIndex, text]);

  return (
    <>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.8em] bg-white/50 ml-1 align-middle"
      />
    </>
  );
};

const skillChips = ['Python', 'Angular', 'FastAPI', 'TypeScript', 'Docker', 'MySQL', 'Azure', 'Git'];

const ProgrammerHero = () => {
  return (
    <section className="min-h-screen bg-[#080808] px-4 md:px-6 flex items-center relative overflow-hidden">
      <BlobBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Main hero card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-2 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-10 lg:p-14 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)", minHeight: "480px" }}
          >
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/35 font-mono text-sm tracking-widest uppercase"
              >
                Hi, I&apos;m
              </motion.p>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight">
                <TypingEffect text="Ganesha N Hotti" />
              </h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-xl lg:text-2xl text-white/40 font-medium"
              >
                Software Engineer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="text-white/35 leading-relaxed text-base lg:text-lg max-w-xl"
              >
                I build robust backend systems and innovative web applications
                with a focus on clean architecture and exceptional user experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1 }}
              className="flex flex-col sm:flex-row gap-3 pt-10"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 border-0 font-semibold group transition-all"
                onClick={() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 text-white hover:bg-white/[0.06] hover:border-white/25 group transition-all"
                style={{ background: "rgba(255,255,255,0.04)" }}
                asChild
              >
                <a href="/Ganesha_N_Hotti.pdf" download>
                  Download Resume
                  <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-4">

            {/* Available status card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/70" />
                </span>
                <span className="text-white font-semibold text-sm">Available for opportunities</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed pl-5">
                Open to full-time roles, freelance projects, and interesting collaborations.
              </p>
            </motion.div>

            {/* Skills chip cloud */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p className="text-white/25 text-xs font-mono uppercase tracking-widest mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2 content-start">
                {skillChips.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="px-3 py-1.5 rounded-xl text-sm border border-white/10 text-white/55 font-medium"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Quick stat card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="backdrop-blur-xl border border-white/[0.08] rounded-3xl px-6 py-5 flex items-center justify-between"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">3+</p>
                <p className="text-white/30 text-xs mt-0.5">Years Exp.</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-sm font-semibold text-white/70">Boeing</p>
                <p className="text-white/30 text-xs mt-0.5">Current</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-sm font-semibold text-white/70">Bangalore</p>
                <p className="text-white/30 text-xs mt-0.5">India</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammerHero;
