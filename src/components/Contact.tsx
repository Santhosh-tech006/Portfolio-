import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { personalInfo, submitContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = 'Please enter a message (at least 8 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      setSubmitStatus('success');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
      });

      if (res.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setErrorMessage(res.error || 'Failed to dispatch message.');
      }
    } catch (err: any) {
      setSubmitStatus('error');
      setErrorMessage(err?.message || 'Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Contact & Connect
          </h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mt-3" />
          <p className="text-sm text-slate-600 mt-3 max-w-xl">
            Feel free to reach out for internship opportunities, project collaborations, or technical inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-6 sm:p-7 rounded-xl border border-slate-200 space-y-5">
              <h3 className="text-base font-bold text-slate-900">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-xs sm:text-sm truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Phone & WhatsApp</span>
                    <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-xs sm:text-sm block">
                      +91 {personalInfo.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200">
                  <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-800 text-xs sm:text-sm block">
                      {personalInfo.location}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Velalar College of Engineering and Technology
                    </span>
                  </div>
                </div>
              </div>

              {/* Online Profiles */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-mono font-medium text-slate-400 block mb-3">
                  Online Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      LinkedIn
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-4 h-4 text-slate-800" />
                      GitHub
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Send a Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-5 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="mt-0.5 text-emerald-700">
                      Thank you for contacting S. Santhosh. Your message has been received and I will respond soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-5 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold">Unable to send message</p>
                    <p className="mt-0.5 text-rose-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="user_anti_spam"
                  value={formData.honeypot}
                  onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-rose-400' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship inquiry / Project collaboration"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message ? 'border-rose-400' : 'border-slate-300'
                    }`}
                  />
                  {errors.message && <p className="text-rose-500 text-[11px] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-xs transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
