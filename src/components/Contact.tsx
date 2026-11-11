import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ScrollReveal } from './ScrollReveal';
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
    <section id="contact" className="py-24 sm:py-32 bg-[#000000] border-t border-[#292929] transition-colors relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-14">
            <span className="text-xs font-semibold text-[#22D3EE] uppercase tracking-wider font-mono">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
              Contact & Connect
            </h2>
            <div className="w-12 h-1 bg-[#3B82F6] rounded-full mt-3" />
            <p className="text-sm text-[#A1A1AA] mt-3 max-w-xl">
              Feel free to reach out for internship opportunities, project collaborations, or technical inquiries.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Contact Details Card */}
          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <div className="bg-[#111111] p-6 sm:p-8 rounded-2xl border border-[#252525] shadow-xl shadow-black/40 space-y-5">
              <h3 className="text-base font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-3.5 text-sm">
                <a
                  href={`mailto:${personalInfo.email}`}
                  data-cursor="Send Email"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#3B82F6]/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#252525] text-[#22D3EE] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[11px] font-mono text-zinc-500 block">Email Address</span>
                    <span className="font-semibold text-zinc-200 group-hover:text-[#22D3EE] transition-colors text-xs sm:text-sm truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  data-cursor="Call Santhosh"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#3B82F6]/60 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#252525] text-[#3B82F6] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 block">Phone & WhatsApp</span>
                    <span className="font-semibold text-zinc-200 group-hover:text-[#3B82F6] transition-colors text-xs sm:text-sm block">
                      +91 {personalInfo.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525]">
                  <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#252525] text-[#22D3EE] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-500 block">Location</span>
                    <span className="font-semibold text-zinc-200 text-xs sm:text-sm block">
                      {personalInfo.location}
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5">
                      Velalar College of Engineering and Technology
                    </span>
                  </div>
                </div>
              </div>

              {/* Online Profiles */}
              <div className="pt-3 border-t border-[#252525]">
                <span className="text-xs font-mono font-medium text-zinc-500 block mb-3">
                  Online Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LinkedIn"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs font-semibold text-zinc-300 hover:text-[#22D3EE] hover:border-[#3B82F6]/60 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-4 h-4 text-[#3B82F6]" />
                      LinkedIn
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="GitHub"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs font-semibold text-zinc-300 hover:text-white hover:border-[#3B82F6]/60 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Github className="w-4 h-4 text-zinc-300" />
                      GitHub
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.15} className="lg:col-span-7">
            <div className="bg-[#111111] p-6 sm:p-8 rounded-2xl border border-[#252525] shadow-xl shadow-black/40">
              <h3 className="text-lg font-bold text-white mb-5">
                Send a Message
              </h3>

              {submitStatus === 'success' && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="mt-0.5 text-emerald-700 dark:text-emerald-300">
                      Thank you for contacting S. SANTHOSH. Your message has been received and I will respond soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold">Unable to send message</p>
                    <p className="mt-0.5 text-rose-700 dark:text-rose-300">{errorMessage}</p>
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
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-rose-400' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.name && <p className="text-rose-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? 'border-rose-400' : 'border-slate-300 dark:border-slate-700'
                      }`}
                    />
                    {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship inquiry / Project collaboration"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message ? 'border-rose-400' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  />
                  {errors.message && <p className="text-rose-500 text-[11px] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
