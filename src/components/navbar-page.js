"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "home" },
  { name: "About", href: "about" },
  { name: "Experience", href: "experience" },
  { name: "Education", href: "certifications" },
  { name: "Skills", href: "skills" },
  { name: "Projects", href: "projects" },
  { name: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const refs = useRef({});

  const updateIndicator = (section) => {
    setTimeout(() => {
      const el = refs.current[section];
      if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }, 10);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 100;
      let current = navItems[0].href;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].href);
        if (el && el.offsetTop <= scrollPos) { current = navItems[i].href; break; }
      }
      if (current !== activeSection) { setActiveSection(current); updateIndicator(current); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  useEffect(() => { updateIndicator(activeSection); }, [activeSection]);

  useEffect(() => {
    const onResize = () => updateIndicator(activeSection);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeSection]);

  const handleNavClick = (href, e) => {
    if (e) e.preventDefault();
    setActiveSection(href);
    updateIndicator(href);
    const el = document.getElementById(href);
    history.replaceState(null, "", `#${href}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      <div className="w-full backdrop-blur-xl border-b border-white/[0.06]" style={{ background: "rgba(0,0,0,0.6)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          {/* Brand */}
          <a
            href="#home"
            onClick={(e) => handleNavClick("home", e)}
            className="flex items-center gap-0.5 select-none group"
          >
            <span className="text-white/20 font-mono text-sm transition-colors group-hover:text-white/40">&lt;</span>
            <span className="font-bold text-base text-white tracking-widest px-1.5">GNH</span>
            <span className="text-white/20 font-mono text-sm transition-colors group-hover:text-white/40">/&gt;</span>
          </a>

          {/* Desktop nav — pill container with sliding active indicator */}
          <div
            className="hidden lg:flex items-center gap-0.5 relative p-1 rounded-full border border-white/[0.08]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <motion.div
              className="absolute h-8 rounded-full"
              style={{ background: "rgba(255,255,255,0.10)" }}
              animate={indicatorStyle}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`#${item.href}`}
                ref={(el) => (refs.current[item.href] = el)}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeSection === item.href ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Socials + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-5">
              <a href="https://github.com/GaneshaNHotti" target="_blank" rel="noreferrer"
                className="text-white/30 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/ganeshanhotti/" target="_blank" rel="noreferrer"
                className="text-white/30 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:ganeshahotti5112000@gmail.com"
                className="text-white/30 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <button
              className="lg:hidden text-white/40 hover:text-white transition-colors"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-white/[0.06] overflow-hidden"
              style={{ background: "rgba(0,0,0,0.95)" }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.href
                        ? "text-white"
                        : "text-white/40 hover:text-white hover:bg-white/[0.04]"
                    }`}
                    style={activeSection === item.href ? { background: "rgba(255,255,255,0.08)" } : {}}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex gap-4 pt-3 pl-3 border-t border-white/[0.06] mt-2">
                  <a href="https://github.com/GaneshaNHotti" target="_blank" rel="noreferrer"
                    className="text-white/30 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/ganeshanhotti/" target="_blank" rel="noreferrer"
                    className="text-white/30 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:ganeshahotti5112000@gmail.com"
                    className="text-white/30 hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
