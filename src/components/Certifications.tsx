import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, ExternalLink, Calendar, PlusCircle, FileText } from 'lucide-react';

interface CertificationsProps {
  onOpenAdmin: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({ onOpenAdmin }) => {
  const { certifications } = usePortfolio();

  return (
    <section id="certifications" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
              Credentials
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Certifications & Courses
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          </div>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Upload Certificate</span>
          </button>
        </div>

        {/* Gallery or Empty State */}
        {certifications.length === 0 ? (
          <div className="bg-slate-50 p-10 sm:p-12 rounded-xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Certifications Section Ready
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-5 leading-relaxed">
              No certifications added yet. As you complete Coursera, NPTEL, deep learning specializations, or cloud courses, add them easily with verification IDs.
            </p>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Add Certificate in Admin Panel
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(cert => (
              <div
                key={cert.id}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-blue-600 mb-2">
                    <span className="font-semibold">{cert.issuer}</span>
                    <span className="text-slate-400">{cert.completionDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {cert.courseName}
                  </h3>

                  {cert.credentialId && (
                    <p className="text-xs font-mono text-slate-400 mb-3 truncate">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </div>

                {cert.verificationLink && (
                  <div className="pt-3 border-t border-slate-100 mt-2">
                    <a
                      href={cert.verificationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
