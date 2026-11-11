import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AnimatedSky } from './AnimatedSky';
import { ProfileImage } from './ProfileImage';
import { Download, ArrowRight, Github, Linkedin, Mail, ArrowDown, Brain, Code2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export const Hero: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();

  // Typing animation cycling through titles
  const titles = personalInfo.typingTitles && personalInfo.typingTitles.length > 0
    ? personalInfo.typingTitles
    : [
        'AI & ML Enthusiast',
        'Python Developer',
        'Full-Stack Developer',
        'Data Science Student',
      ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex(prev => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex, titles]);

  // Stagger animation container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="home" className="relative min-h-[94vh] flex items-center pt-28 pb-20 overflow-hidden">
      
      {/* 1. Cinematic Background (Video + SVG Multi-layer Atmospheric Clouds) */}
      <AnimatedSky />

      {/* 2. Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Introduction, Name, Description and Interactive Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            {/* Small blue availability badge */}
            <motion.div variants={itemVariants}>
              <div
                data-cursor="Open to Roles"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-[#252525] text-[#22D3EE] text-xs font-semibold backdrop-blur-md shadow-xs transition-transform hover:scale-[1.02]"
              >
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse shadow-sm shadow-blue-500/50" />
                <span>{personalInfo.statusBadge || 'Open to Placements & Opportunities'}</span>
              </div>
            </motion.div>

            {/* Main Name Heading with Staggered Fade-in */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                {personalInfo.name}
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-[#3B82F6] mt-2.5">
                {personalInfo.title}
              </p>
            </motion.div>

            {/* Smooth Cycling Typing Subtitle */}
            <motion.div
              variants={itemVariants}
              className="h-8 flex items-center justify-center lg:justify-start text-base sm:text-lg font-mono text-zinc-300"
            >
              <span className="text-[#22D3EE] mr-2 font-bold">&gt;</span>
              <span>{displayedText}</span>
              <span className="inline-block w-2 h-5 ml-1 bg-[#3B82F6] animate-pulse" />
            </motion.div>

            {/* Exact Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed font-normal max-w-xl mx-auto lg:mx-0"
            >
              "{personalInfo.tagline}"
            </motion.p>

            {/* Buttons Row & Social Media Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              {/* View Projects Button */}
              <a
                href="#projects"
                data-cursor="View Projects"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/25 focus:outline-hidden"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Contact Me Button */}
              <a
                href="#contact"
                data-cursor="Contact Me"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#292929] bg-[#111111] hover:bg-[#181818] text-white font-medium text-sm transition-all hover:-translate-y-0.5 shadow-xs focus:outline-hidden"
              >
                <span>Get in Touch</span>
              </a>

              {/* Social Media Links */}
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GitHub"
                  className="p-2.5 rounded-xl border border-[#292929] bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="LinkedIn"
                  className="p-2.5 rounded-xl border border-[#292929] bg-[#111111] hover:bg-[#181818] text-[#22D3EE] hover:text-white transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  data-cursor="Email"
                  className="p-2.5 rounded-xl border border-[#292929] bg-[#111111] hover:bg-[#181818] text-zinc-300 hover:text-[#22D3EE] transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="Send Email"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Profile Image with Floating Visual Elements */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            
            {/* Entrance & Floating Wrapper for Profile Image */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <ProfileImage size="lg" />

              {/* Floating Element 1: Top-Left AI/ML Tag */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.4 },
                    x: { duration: 0.6, delay: 0.4 },
                    y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute -top-4 -left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111111] border border-[#292929] shadow-lg shadow-black/80 backdrop-blur-md text-xs font-semibold text-white"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#181818] text-[#22D3EE] flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <span>AI & Deep Learning</span>
                </motion.div>
              )}

              {/* Floating Element 2: Bottom-Right Tech & Academic Standing */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: [0, 8, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.6, delay: 0.6 },
                    x: { duration: 0.6, delay: 0.6 },
                    y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                  }}
                  className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111111] border border-[#292929] shadow-lg shadow-black/80 backdrop-blur-md text-xs font-semibold text-white"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#181818] text-[#3B82F6] flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Python · React · 8.22 CGPA</span>
                </motion.div>
              )}
            </motion.div>

          </div>

        </div>

        {/* Subtle Scroll-down Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 sm:mt-16 flex justify-center"
        >
          <a
            href="#education"
            onClick={e => {
              e.preventDefault();
              document.querySelector('#education')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center gap-1.5 text-xs font-mono text-[#A0A0A0] hover:text-white transition-colors group"
            aria-label="Scroll down to Education Section"
          >
            <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#3B82F6]" />
          </a>
        </motion.div>

      </div>

    </section>
  );
};

