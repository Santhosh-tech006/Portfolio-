import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { ScrollReveal } from './ScrollReveal';
import { Github, X, PlusCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsProps {
  onOpenAdmin: () => void;
}

export const FeaturedProjects: React.FC<ProjectsProps> = ({ onOpenAdmin }) => {
  const { projects } = usePortfolio();
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = ['All', 'AI & ML', 'Full-Stack', 'Python', 'React'];

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'AI & ML') {
      return (
        project.category.toLowerCase().includes('ai') ||
        project.tags.some(t => ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'AI'].includes(t))
      );
    }
    if (selectedFilter === 'Full-Stack') {
      return (
        project.category.toLowerCase().includes('full-stack') ||
        project.tags.some(t => ['React', 'Node.js', 'Full-Stack', 'Platform'].includes(t))
      );
    }
    return project.tags.some(t => t.toLowerCase().includes(selectedFilter.toLowerCase()));
  });

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#000000] border-t border-[#292929] transition-colors relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider font-mono">
                Engineering Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                Featured Academic & Technical Projects
              </h2>
              <div className="w-12 h-1 bg-[#3B82F6] rounded-full mt-3" />
            </div>

            <button
              onClick={onOpenAdmin}
              data-cursor="Admin Panel"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-[#22D3EE] border border-[#252525] px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#181818] self-start sm:self-auto transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add / Manage Projects</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Technology Filter Bar */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-[#0A0A0A] rounded-xl w-fit border border-[#252525]">
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => setSelectedFilter(option)}
                data-cursor={`Filter: ${option}`}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedFilter === option
                    ? 'bg-[#181818] text-[#22D3EE] border border-[#252525] shadow-xs font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.08 * (index + 1)}>
              <div
                data-cursor="Explore Project"
                data-cursor-image={project.imageUrl}
                className="group bg-[#111111] rounded-2xl border border-[#252525] overflow-hidden shadow-xl shadow-black/40 hover:border-[#3B82F6] hover:shadow-2xl hover:shadow-blue-950/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Project Image with Zoom on Hover */}
                  <div className="relative aspect-[16/10] bg-[#0A0A0A] overflow-hidden border-b border-[#252525]">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.nextElementSibling) {
                          (target.nextElementSibling as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    <div
                      style={{ display: 'none' }}
                      className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0A] text-zinc-400 p-4 text-center font-mono text-xs"
                    >
                      <span>{project.title}</span>
                    </div>

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050505]/90 backdrop-blur-xs text-[11px] font-mono font-medium text-[#22D3EE] shadow-xs border border-[#252525]">
                      {project.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Technologies tags */}
                    <div className="mt-4 pt-4 border-t border-[#252525] flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          data-cursor={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-300 bg-[#0A0A0A] border border-[#252525]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-[#0A0A0A] border-t border-[#252525] flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    data-cursor="View Details"
                    className="text-xs font-semibold text-[#3B82F6] hover:text-[#22D3EE] transition-colors inline-flex items-center gap-1 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="GitHub Repo"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-medium"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Clean Modal for Project Details with Smooth Cinematic Transitions */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModalProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#0A0A0A] rounded-2xl border border-[#252525] shadow-2xl shadow-black overflow-hidden flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#252525] flex items-center justify-between bg-[#111111]/80">
                <div>
                  <span className="text-xs font-mono text-[#22D3EE] font-semibold">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  data-cursor="Close Modal"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#181818] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Image Preview */}
                <div className="aspect-video rounded-xl overflow-hidden bg-[#050505] border border-[#252525]">
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Project Overview
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {activeModalProject.summary}
                  </p>
                </div>

                {/* Problem Statement */}
                {activeModalProject.problemStatement && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">
                      Problem Statement
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed bg-[#111111] p-4 rounded-xl border border-[#252525]">
                      {activeModalProject.problemStatement}
                    </p>
                  </div>
                )}

                {/* Methodology & Implementation */}
                {(activeModalProject.methodology || activeModalProject.implementation) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModalProject.methodology && (
                      <div className="p-4 rounded-xl border border-[#252525] bg-[#111111]">
                        <h4 className="text-xs font-mono font-bold text-[#22D3EE] uppercase tracking-wider mb-1">
                          Methodology
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {activeModalProject.methodology}
                        </p>
                      </div>
                    )}
                    {activeModalProject.implementation && (
                      <div className="p-4 rounded-xl border border-[#252525] bg-[#111111]">
                        <h4 className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-1">
                          Implementation
                        </h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          {activeModalProject.implementation}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Features */}
                {activeModalProject.features && activeModalProject.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                      {activeModalProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-[#252525] bg-[#111111]/70">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3EE] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.tags.map(tag => (
                      <span
                        key={tag}
                        data-cursor={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#181818] text-[#22D3EE] border border-[#252525]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#252525] bg-[#111111]/90 flex items-center justify-between">
                {activeModalProject.githubUrl ? (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open Repository"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Repository</span>
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() => setActiveModalProject(null)}
                  data-cursor="Close Modal"
                  className="px-4 py-2 rounded-xl border border-[#252525] bg-[#181818] text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#202020] transition-colors"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
