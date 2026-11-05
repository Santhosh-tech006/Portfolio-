import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types/portfolio';
import { Github, ExternalLink, X, PlusCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  onOpenAdmin: () => void;
}

export const FeaturedProjects: React.FC<ProjectsProps> = ({ onOpenAdmin }) => {
  const { projects } = usePortfolio();
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
              Engineering Work
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Featured Academic & Technical Projects
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add / Manage Projects</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={e => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback image */}
                  <div
                    style={{ display: 'none' }}
                    className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-600 p-4 text-center font-mono text-xs"
                  >
                    <span>{project.title}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <span className="text-xs font-mono font-medium text-blue-600 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Technologies tags */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
                >
                  View Details &rarr;
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Clean Details Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col my-auto">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-mono text-blue-600 font-semibold">
                  {activeModalProject.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Image Preview */}
              <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={activeModalProject.imageUrl}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalProject.summary}
                </p>
              </div>

              {/* Problem Statement */}
              {activeModalProject.problemStatement && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Problem Statement
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {activeModalProject.problemStatement}
                  </p>
                </div>
              )}

              {/* Methodology & Implementation */}
              {(activeModalProject.methodology || activeModalProject.implementation) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModalProject.methodology && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Methodology
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activeModalProject.methodology}
                      </p>
                    </div>
                  )}
                  {activeModalProject.implementation && (
                    <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                      <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Implementation
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {activeModalProject.implementation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Key Features */}
              {activeModalProject.features && activeModalProject.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {activeModalProject.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 p-2.5 rounded border border-slate-100 bg-slate-50/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              {activeModalProject.githubUrl ? (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  View GitHub Repository
                </a>
              ) : (
                <div />
              )}

              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
