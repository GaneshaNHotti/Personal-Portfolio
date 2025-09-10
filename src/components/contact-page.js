"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Send, 
  Terminal, 
  Code, 
  Zap, 
  User, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
} from 'lucide-react';
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

/**
 * @typedef {Object} FormData
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/**
 * @typedef {Object} FormErrors
 * @property {string=} name
 * @property {string=} email
 * @property {string=} subject
 * @property {string=} message
 */

const ContactTitle = () => (
  <div className="text-center mb-10">
    <h2 className="text-4xl lg:text-6xl font-bold text-white font-mono mb-4">
      <span className="text-white">user</span>
      <span className="text-blue-400">.SendPing</span>
      <span className="text-purple-400">()</span>
    </h2>
    <p className="mt-2 text-green-400 font-mono text-sm lg:text-base tracking-wide">
      {"// Let's build something awesome together."}
    </p>
  </div>
);

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

export const AnimatedContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [isMounted, setIsMounted] = useState(false);
  const [terminalBooted, setTerminalBooted] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [fieldProgress, setFieldProgress] = useState({
    name: 0,
    email: 0,
    subject: 0,
    message: 0
  });

  const terminalRef = useRef(null);

  // Boot sequence commands
  const bootCommands = [
    'Initializing contact interface...',
    'Loading form validation modules...',
    'Establishing secure connection...',
    'Terminal ready. Please enter your details.',
  ];

  // Matrix rain effect
  useEffect(() => {
    setIsMounted(true);

    // Terminal boot sequence
    const bootSequence = async () => {
      for (let i = 0; i < bootCommands.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setCurrentCommand(bootCommands[i]);
      }
      setTerminalBooted(true);
    };

    const timer = setTimeout(bootSequence, 500);
    return () => clearTimeout(timer);
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'ERROR: Name must be at least 2 characters' : undefined;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'ERROR: Invalid email format' : undefined;
      case 'subject':
        return !value ? 'ERROR: Subject selection required' : undefined;
      case 'message':
        return value.length < 10 ? 'ERROR: Message must be at least 10 characters' : undefined;
      default:
        return undefined;
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // Update progress for the field
    let progress = 0;
    if (value) {
      switch (name) {
        case 'name':
          // Gradually increase progress from 0 to 100% as user types (reaches 100% at 10 characters)
          progress = Math.min((value.length / 10) * 100, 100);
          break;
        case 'email':
          // Progress based on email format completion
          const hasAt = value.includes('@');
          const hasDot = value.includes('.');
          const hasDomain = value.split('@')[1]?.length > 0;
          
          if (hasAt && hasDot && hasDomain) {
            progress = 100; // Complete email format
          } else if (hasAt && hasDot) {
            progress = 75; // Has @ and . but might be missing domain
          } else if (hasAt) {
            progress = 50; // Only has @
          } else if (value.length > 0) {
            progress = 25; // Started typing but no @ yet
          }
          break;
        case 'subject':
          // Only show 100% when a subject is selected
          progress = value ? 100 : 0;
          break;
        case 'message':
          // Gradually increase progress, reaching 100% at 50 characters
          progress = Math.min((value.length / 50) * 100, 100);
          break;
        default:
          progress = 0;
      }
    }
    
    setFieldProgress(prev => ({ ...prev, [name]: progress }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Initialize EmailJS when component mounts
  useEffect(() => {
    // Replace these with your actual EmailJS credentials
    emailjs.init({
      publicKey: 'VBXdyXo45T1l0qNaj',
      blockHeadless: true,
      blockList: {
        '\w+@email\.com': 'This email is blocked',
      },
      limitRate: {
        throttle: 10000, // 10s
      },
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_n69zhfs', // Replace with your EmailJS service ID
        'template_7xoc7xr', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'ganeshahotti5112000@gmail.com' // Your email address
        },
        'VBXdyXo45T1l0qNaj' // Your EmailJS public key (can be the same as above)
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset the status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const TerminalCursor = () => (
    <span className="animate-pulse text-green-400">█</span>
  );

  const TypewriterText = ({ text, delay = 50 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, delay);

      return () => clearInterval(timer);
    }, [text, delay]);

    return <span>{displayText}</span>;
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 relative overflow-hidden">
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
      <MatrixRain />
      <MatrixBackground />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Contact Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mb-12 text-center"
        >
          <motion.div
            className="inline-block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <ContactTitle />
          </motion.div>
        </motion.div>

      {/* Terminal Div */}
      <div
        ref={terminalRef}
        className="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden relative z-10"
        style={{
          boxShadow: '0 0 50px rgba(0, 255, 65, 0.3)',
        }}
      >

        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2 border-b border-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-4 flex items-center space-x-2 text-gray-300">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-mono">contact-form@terminal:~$</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm">
          {/* Boot sequence */}
          <div className="mb-6">
            {bootCommands.slice(0, bootCommands.indexOf(currentCommand) + 1).map((command, index) => (
              <div key={index} className="text-green-400 mb-1">
                <span className="text-gray-500">$</span> {command}
              </div>
            ))}
            <div className="text-green-400">
              <span className="text-gray-500">$</span> <TerminalCursor />
            </div>
          </div>

          {/* Form */}
          {terminalBooted && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-green-400 text-lg mb-6">
                &gt; SECURE CONTACT PROTOCOL INITIATED
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-green-400 font-mono text-sm flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      NAME:<span className="text-red-400 ml-1">*</span>
                    </Label>
                    {fieldProgress.name > 0 && (
                      <span className="text-xs font-mono" style={{ color: errors.name ? '#f87171' : '#4ade80' }}>
                        {Math.round(fieldProgress.name)}%
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={(e) => {
                        setFocusedField(null);
                        handleBlur('name', e.target.value);
                      }}
                      className={`
                        bg-black border-gray-600 text-green-400 font-mono
                        placeholder:text-gray-500 transition-all duration-300
                        ${focusedField === 'name' ? 'border-green-400 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : ''}
                        ${errors.name ? 'border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}
                      `}
                      placeholder={`${focusedField === 'name' || formData.name ? '' : 'Enter your name...'}`}
                    />
                    {focusedField === 'name' && (
                      <div className="absolute right-3 top-3">
                        <TerminalCursor />
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${fieldProgress.name}%`,
                        backgroundColor: errors.name ? '#ef4444' : '#10b981',
                        transition: { duration: 0.5, ease: 'easeOut' }
                      }}
                    />
                  </div>
                  {errors.name && (
                    <div className="text-red-400 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-green-400 font-mono text-sm flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      EMAIL:<span className="text-red-400 ml-1">*</span>
                    </Label>
                    {fieldProgress.email > 0 && (
                      <span className="text-xs font-mono" style={{ color: errors.email ? '#f87171' : '#4ade80' }}>
                        {fieldProgress.email}%
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={(e) => {
                        setFocusedField(null);
                        handleBlur('email', e.target.value);
                      }}
                      className={`
                        bg-black border-gray-600 text-green-400 font-mono
                        placeholder:text-gray-500 transition-all duration-300
                        ${focusedField === 'email' ? 'border-green-400 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : ''}
                        ${errors.email ? 'border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}
                      `}
                      placeholder={`${focusedField === 'email' || formData.email ? '' : 'Enter your email...'}`}
                    />
                    {focusedField === 'email' && (
                      <div className="absolute right-3 top-3">
                        <TerminalCursor />
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${fieldProgress.email}%`,
                        backgroundColor: errors.email ? '#ef4444' : '#10b981',
                        transition: { duration: 0.5, ease: 'easeOut' }
                      }}
                    />
                  </div>
                  {errors.email && (
                    <div className="text-red-400 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-green-400 font-mono text-sm flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SUBJECT:<span className="text-red-400 ml-1">*</span>
                    </Label>
                    {fieldProgress.subject > 0 && (
                      <span className="text-xs font-mono" style={{ color: errors.subject ? '#f87171' : '#4ade80' }}>
                        {fieldProgress.subject}%
                      </span>
                    )}
                  </div>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                    onOpenChange={(open) => {
                      if (!open) {
                        handleBlur('subject', formData.subject);
                      } else {
                        setFocusedField('subject');
                      }
                    }}
                  >
                    <SelectTrigger
                      className={`bg-black border-gray-600 text-green-400 font-mono
                        ${focusedField === 'subject' ? 'border-green-400 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : ''}
                        ${errors.subject ? 'border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}
                      `}
                    >
                      <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-600">
                      <SelectItem value="collaboration" className="text-green-400 font-mono">Collaboration</SelectItem>
                      <SelectItem value="hiring" className="text-green-400 font-mono">Hiring</SelectItem>
                      <SelectItem value="general" className="text-green-400 font-mono">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${fieldProgress.subject}%`,
                        backgroundColor: errors.subject ? '#ef4444' : '#10b981',
                        transition: { duration: 0.5, ease: 'easeOut' }
                      }}
                    />
                  </div>
                  {errors.subject && (
                    <div className="text-red-400 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.subject}
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-green-400 font-mono text-sm flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      MESSAGE:<span className="text-red-400 ml-1">*</span>
                    </Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">
                        {formData.message.length}/1000
                      </span>
                      {fieldProgress.message > 0 && (
                        <span className="text-xs font-mono" style={{ color: errors.message ? '#f87171' : '#4ade80' }}>
                          {Math.round(fieldProgress.message)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={(e) => {
                        setFocusedField(null);
                        handleBlur('message', e.target.value);
                      }}
                      rows={6}
                      className={`
                        bg-black border-gray-600 text-green-400 font-mono resize-none
                        placeholder:text-gray-500 transition-all duration-300
                        ${focusedField === 'message' ? 'border-green-400 shadow-[0_0_10px_rgba(0,255,65,0.5)]' : ''}
                        ${errors.message ? 'border-red-400 shadow-[0_0_10px_rgba(255,0,0,0.5)]' : ''}
                      `}
                      placeholder={`${focusedField === 'message' || formData.message ? '' : 'Enter your message...'}`}
                    />
                    {focusedField === 'message' && (
                      <div className="absolute right-3 top-3">
                        <TerminalCursor />
                      </div>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${fieldProgress.message}%`,
                        backgroundColor: errors.message ? '#ef4444' : '#10b981',
                        transition: { duration: 0.5, ease: 'easeOut' }
                      }}
                    />
                  </div>
                  {errors.message && (
                    <div className="text-red-400 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full bg-transparent border-2 border-green-400 text-green-400 font-mono
                      hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.7)]
                      disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-green-400
                      transition-all duration-300 transform hover:scale-105
                      ${submitStatus === 'success' ? 'border-blue-400 text-blue-400' : ''}
                      ${submitStatus === 'error' ? 'border-red-400 text-red-400' : ''}
                    `}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING...</span>
                      </div>
                    ) : submitStatus === 'success' ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>MESSAGE SENT SUCCESSFULLY</span>
                      </div>
                    ) : submitStatus === 'error' ? (
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4" />
                        <span>TRANSMISSION FAILED</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>SEND MESSAGE</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>

              {/* Footer */}
              <div className="text-gray-500 text-xs text-center mt-8">
                Secure connection established. Your data is encrypted.
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
    </div>
  );
};

export default AnimatedContactForm;
