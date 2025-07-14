"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Home, Code, Briefcase, Mail, Monitor, Cpu } from 'lucide-react';
import PropTypes from 'prop-types';

// ... (typedefs and defaultNavItems remain the same) ...
/**
 * @typedef {Object} NavItem
 * @property {string} name - The display name of the navigation item
 * @property {string} href - The URL hash the item links to
 * @property {React.ComponentType} icon - The icon component to display
 */

/**
 * @typedef {Object} FloatingProgrammerNavProps
 * @property {Array<NavItem>} [navItems] - Array of navigation items
 */

const defaultNavItems = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Skills', href: '#skills', icon: Code },
  { name: 'Projects', href: '#projects', icon: Monitor },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export const FloatingProgrammerNav = ({ navItems = defaultNavItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  // Initialize isMobile to null or undefined.
  // This signifies that the client-side check hasn't happened yet.
  const [isMobile, setIsMobile] = useState(null); 
  const [showCursor, setShowCursor] = useState(true);
  const { scrollY } = useScroll();

  // Handle scroll effects for transparency changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Handle responsive design
  useEffect(() => {
    // This code only runs on the client after initial hydration
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Set initial state based on client's window size
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Empty dependency array means it runs once after initial render

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

  // Handle smooth scrolling
  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  // Track active section with improved logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      let currentSection = '#home';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop - 50) {
            currentSection = `#${section}`;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Only add event listener if window is defined (i.e., on client)
    if (typeof window !== 'undefined') {
        handleScroll(); // Set initial active section on client
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [navItems]);

  return (
    <>
      {/* Matrix-style background particles - This section is more tricky with Math.random() */}
      {/* For these, you might also consider only rendering them on the client,
          or ensuring that motion/react handles any initial discrepancies gracefully.
          However, the `isMobile` issue is the primary one. */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-400 rounded-full opacity-20"
            animate={{
              y: ['100vh', '-10px'],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2, // This Math.random() can cause a mismatch too
              repeat: Infinity,
              delay: Math.random() * 2, // This Math.random() can cause a mismatch too
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`, // This Math.random() can cause a mismatch too
            }}
          />
        ))}
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-1 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-6xl px-4"
        style={{ willChange: 'transform' }}
      >
        <div className="relative">
          <motion.div 
            className="relative backdrop-blur-xl border border-emerald-400/40 rounded-lg shadow-2xl shadow-emerald-400/20"
            animate={{
              backgroundColor: isScrolled ? "rgba(17, 24, 39, 0.90)" : "rgba(17, 24, 39, 0.75)",
              borderColor: isScrolled ? "rgba(52, 211, 153, 0.5)" : "rgba(52, 211, 153, 0.4)",
              boxShadow: isScrolled 
                ? "0 25px 50px -12px rgba(52, 211, 153, 0.25), 0 0 0 1px rgba(52, 211, 153, 0.1)" 
                : "0 20px 25px -5px rgba(52, 211, 153, 0.1), 0 0 0 1px rgba(52, 211, 153, 0.05)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-lg">
              {/* Animated glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-emerald-400/5 to-emerald-400/10"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Terminal prompt */}
              <div className="px-4 py-2 border-b border-emerald-400/20 bg-gray-800/40 backdrop-blur-sm">
                <div className="text-emerald-400 text-sm font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span className="text-gray-400">user@portfolio:</span>
                  <span className="text-white">~$</span>
                  <span className="text-emerald-400">navigate</span>
                  <AnimatePresence>
                    {showCursor && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-emerald-400"
                      >
                        |
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation items */}
              <div className={`p-3 ${isMobile ? 'flex gap-1 justify-center' : 'flex gap-2 justify-center'}`}>
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`
                        relative group rounded-lg transition-all duration-300 font-mono text-sm 
                        border backdrop-blur-sm
                        ${isActive 
                          ? 'bg-emerald-400/20 border-emerald-400/60 text-emerald-300 shadow-lg shadow-emerald-400/30' 
                          : 'border-emerald-400/20 text-gray-300 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/40'
                        }
                        ${
                            // Render based on `isMobile` only when it's been determined on the client
                            isMobile === null 
                                ? 'px-4 py-2.5' // Default for SSR (desktop-first) or before client check
                                : isMobile ? 'p-2.5' : 'px-4 py-2.5'
                        }
                      `}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Hover glow effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100"
                        animate={{ opacity: isActive ? 0.3 : 0 }}
                        whileHover={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <div className="relative flex items-center gap-2">
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-400' : 'group-hover:text-emerald-400'}`} />
                        {/* Only render this span if isMobile is explicitly false (i.e., desktop) */}
                        {isMobile === false && (
                          <>
                            <span className="text-emerald-400/60">[</span>
                            <span className="group-hover:text-white transition-colors">
                              {item.name.toLowerCase()}
                            </span>
                            <span className="text-emerald-400/60">]</span>
                          </>
                        )}
                        {/* For mobile, you might want a different rendering or just the icon */}
                        {isMobile === true && (
                          // Optionally render something else for mobile if needed, or nothing for just icon
                          // For example, if you want a tooltip for mobile:
                          // <span className="sr-only">{item.name}</span> 
                          null
                        )}
                        {/* During SSR or before client check, render desktop version */}
                        {isMobile === null && (
                            <>
                                <span className="text-emerald-400/60">[</span>
                                <span className="group-hover:text-white transition-colors">
                                  {item.name.toLowerCase()}
                                </span>
                                <span className="text-emerald-400/60">]</span>
                            </>
                        )}
                      </div>

                      {/* Active indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-1/2 w-2 h-0.5 bg-emerald-400 rounded-full shadow-emerald-400/80 shadow-sm"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            style={{ transform: 'translateX(-50%)' }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Scan line effect on hover */}
                      <motion.div
                        className="absolute inset-0 border border-emerald-400/40 rounded-lg opacity-0 group-hover:opacity-100"
                        animate={{
                          borderColor: ['rgba(52, 211, 153, 0.4)', 'rgba(52, 211, 153, 0.8)', 'rgba(52, 211, 153, 0.4)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Terminal output status */}
              <motion.div 
                className="px-4 py-2 border-t border-emerald-400/20 bg-gray-800/40 backdrop-blur-sm"
                animate={{ backgroundColor: isScrolled ? "rgba(31, 41, 55, 0.6)" : "rgba(31, 41, 55, 0.4)" }}
              >
                <div className="text-emerald-400/70 text-xs font-mono flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  />
                  <span className="text-emerald-400">Status:</span>
                  <span className="text-gray-400">Navigation Active</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-emerald-300">
                    {navItems.find(item => item.href === activeSection)?.name.toLowerCase() || 'home'}_loaded
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

export default FloatingProgrammerNav;

FloatingProgrammerNav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired
    })
  )
};