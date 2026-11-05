import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, ShieldCheck, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { activeSection, isAdminLoggedIn, personalInfo } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-xs py-3.5'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-slate-900 text-base leading-none">
              {personalInfo.name}
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-0.5">
              AI & Data Science
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => {
            const sectionKey = link.href.replace('#', '');
            const isActive = activeSection === sectionKey || (sectionKey === 'home' && activeSection === 'intro');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Admin toggle icon */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isAdminLoggedIn
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isAdminLoggedIn ? 'Admin Panel Active' : 'Admin Login'}
            aria-label="Admin Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          {/* Say Hello Button */}
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Me
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-4 shadow-md transition-all">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-medium py-2 px-3 rounded-md text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Get In Touch
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
