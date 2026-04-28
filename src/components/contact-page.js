"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Loader2, CheckCircle, XCircle, Send, AlertCircle, Github, Linkedin, Mail, ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const BlobBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{ background: "rgba(255,255,255,0.03)", filter: "blur(160px)", top: "5%", right: "-10%" }}
      animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{ background: "rgba(255,255,255,0.02)", filter: "blur(130px)", bottom: "10%", left: "-5%" }}
      animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 6 }}
    />
  </div>
);

const contactLinks = [
  {
    label: "Email",
    value: "ganeshahotti5112000@gmail.com",
    short: "Say hello directly",
    href: "mailto:ganeshahotti5112000@gmail.com",
    Icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "ganeshanhotti",
    short: "Connect professionally",
    href: "https://www.linkedin.com/in/ganeshanhotti/",
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "GaneshaNHotti",
    short: "See my open source work",
    href: "https://github.com/GaneshaNHotti",
    Icon: Github,
  },
];

const AnimatedContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    import("@emailjs/browser").then((mod) => {
      mod.default.init({ publicKey: "VBXdyXo45T1l0qNaj", blockHeadless: true, limitRate: { throttle: 10000 } });
    });
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "name":    return value.length < 2   ? "Name must be at least 2 characters" : undefined;
      case "email":   return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email address" : undefined;
      case "subject": return !value             ? "Please select a subject" : undefined;
      case "message": return value.length < 10  ? "Message must be at least 10 characters" : undefined;
      default:        return undefined;
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      const response = await emailjs.send("service_n69zhfs", "template_7xoc7xr", {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "ganeshahotti5112000@gmail.com",
      }, "VBXdyXo45T1l0qNaj");
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else throw new Error("Failed");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  if (!isMounted) return null;

  const inputCls = (field) =>
    `border-white/[0.08] text-white placeholder:text-white/20 focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all${errors[field] ? " border-red-500/50" : ""}`;

  return (
    <section className="min-h-screen bg-[#080808] px-4 md:px-6 py-24 relative overflow-hidden flex items-center">
      <BlobBackground />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-baseline justify-between border-b border-white/[0.06] pb-5"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Get in Touch</h2>
          <span className="text-white/25 font-mono text-xs uppercase tracking-widest">Say Hello</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Form card (col-span-2) ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              className="backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden h-full flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.12)" }} />
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/40 text-xs font-mono uppercase tracking-wider">Name</Label>
                    <Input type="text" value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={(e) => handleBlur("name", e.target.value)}
                      className={inputCls("name")} style={{ background: "rgba(255,255,255,0.03)" }}
                      placeholder="John Doe" />
                    {errors.name && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/40 text-xs font-mono uppercase tracking-wider">Email</Label>
                    <Input type="email" value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={(e) => handleBlur("email", e.target.value)}
                      className={inputCls("email")} style={{ background: "rgba(255,255,255,0.03)" }}
                      placeholder="john@example.com" />
                    {errors.email && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/40 text-xs font-mono uppercase tracking-wider">Subject</Label>
                  <Select value={formData.subject} onValueChange={(v) => handleInputChange("subject", v)}>
                    <SelectTrigger className={`${inputCls("subject")} w-full`} style={{ background: "rgba(255,255,255,0.03)" }}>
                      <SelectValue placeholder="Select a topic..." />
                    </SelectTrigger>
                    <SelectContent className="border-white/[0.08]" style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(20px)" }}>
                      <SelectItem value="collaboration" className="text-white/60 focus:bg-white/[0.08] focus:text-white">Collaboration</SelectItem>
                      <SelectItem value="hiring" className="text-white/60 focus:bg-white/[0.08] focus:text-white">Hiring</SelectItem>
                      <SelectItem value="general" className="text-white/60 focus:bg-white/[0.08] focus:text-white">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-white/40 text-xs font-mono uppercase tracking-wider">Message</Label>
                    <span className="text-white/20 text-xs">{formData.message.length}/1000</span>
                  </div>
                  <Textarea value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    onBlur={(e) => handleBlur("message", e.target.value)}
                    rows={5} className={`${inputCls("message")} resize-none`}
                    style={{ background: "rgba(255,255,255,0.03)" }}
                    placeholder="Tell me about your project or just say hi..." />
                  {errors.message && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" disabled={isSubmitting}
                    className={`w-full h-11 font-semibold transition-all duration-300 disabled:opacity-60 ${
                      submitStatus === "success" ? "bg-emerald-600 hover:bg-emerald-600 text-white"
                      : submitStatus === "error" ? "bg-red-600 hover:bg-red-600 text-white"
                      : "bg-white text-black hover:bg-white/90"
                    }`}
                  >
                    {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Sending...</span>
                    : submitStatus === "success" ? <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Message Sent!</span>
                    : submitStatus === "error" ? <span className="flex items-center gap-2"><XCircle className="w-4 h-4" />Failed to Send</span>
                    : <span className="flex items-center gap-2"><Send className="w-4 h-4" />Send Message</span>}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* ── Right column: single unified card with intro + links ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div
              className="backdrop-blur-xl border border-white/[0.08] rounded-3xl overflow-hidden h-full"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

              <div className="p-7 flex flex-col gap-5">
                {/* Intro text */}
                <div>
                  <h3 className="text-white font-semibold text-base mb-2">Let&apos;s work together</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Available for full-time roles, freelance projects, and interesting collaborations.
                    Reach out through any channel below.
                  </p>
                </div>

                <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

                {/* Contact links */}
                <div className="flex flex-col gap-3">
                  {contactLinks.map((link, index) => {
                    const { Icon } = link;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.2 + index * 0.07 }}
                        className="group flex items-center justify-between p-4 rounded-2xl border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center shrink-0"
                            style={{ background: "rgba(255,255,255,0.06)" }}
                          >
                            <Icon className="w-4 h-4 text-white/50 group-hover:text-white/75 transition-colors" />
                          </div>
                          <div>
                            <p className="text-white/25 text-xs font-mono">{link.label}</p>
                            <p className="text-white/55 text-sm group-hover:text-white/80 transition-colors">{link.short}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AnimatedContactForm;
