"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  User,
  Briefcase,
  Code2,
  Monitor,
  Mail,
  Home,
  Linkedin,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "home", href: "home", icon: Home },
  { name: "about", href: "about", icon: User },
  { name: "experience", href: "experience", icon: Briefcase },
  { name: "skills", href: "skills", icon: Code2 },
  { name: "projects", href: "projects", icon: Monitor },
  { name: "contact", href: "contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const refs = useRef({});

  // Function to update indicator position
  const updateIndicatorPosition = (section) => {
    // Use setTimeout to ensure DOM has updated
    setTimeout(() => {
      const el = refs.current[section];
      if (el) {
        setIndicatorStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      }
    }, 10);
  };

  // scroll tracking
  useEffect(() => {
    const onScroll = () => {
      const offset = 100;
      const scrollPos = window.scrollY + offset;

      let current = navItems[0].href;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].href);
        if (el && el.offsetTop <= scrollPos) {
          current = navItems[i].href;
          break;
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
        updateIndicatorPosition(current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeSection]);

  // Initialize indicator position on mount and when refs change
  useEffect(() => {
    updateIndicatorPosition(activeSection);
  }, [activeSection]);

  // Also update on window resize to handle responsive changes
  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition(activeSection);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  const handleNavClick = (href, e) => {
    if (e) e.preventDefault();
    setActiveSection(href);
    updateIndicatorPosition(href);
    
    const el = document.getElementById(href);
    history.replaceState(null, "", `#${href}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      <div className="w-full backdrop-blur-sm border-b border-emerald-400/40 bg-gray-900/80 shadow-lg shadow-emerald-400/20">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14 relative">
          {/* Brand */}
          <div className="font-mono font-bold text-emerald-400 tracking-widest">
            GNH
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  ref={(el) => (refs.current[item.href] = el)}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`relative flex items-center gap-1 font-mono text-sm transition-colors ${
                    activeSection === item.href
                      ? "text-emerald-400"
                      : "text-gray-300 hover:text-emerald-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>[ {item.name.toLowerCase()} ]</span>
                </a>
              );
            })}

            {/* single underline indicator */}
            <motion.div
              className="absolute -bottom-1 h-0.5 bg-emerald-400 rounded-full"
              style={indicatorStyle}
              animate={indicatorStyle}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>

          {/* Right: socials + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <a
                href="https://github.com/GaneshaNHotti"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/ganeshanhotti/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors" />
              </a>
              <a href="mailto:ganeshahotti5112000@gmail.com">
                <Mail className="w-5 h-5 text-gray-300 hover:text-emerald-400 transition-colors" />
              </a>
            </div>
            <button
              className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors"
              onClick={() => setMobileOpen((s) => !s)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-gray-900/95 border-t border-emerald-400/40 px-6 py-4 space-y-4"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full flex items-center gap-2 font-mono text-sm ${
                      activeSection === item.href
                        ? "text-emerald-400"
                        : "text-gray-300 hover:text-emerald-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name.toLowerCase()}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}