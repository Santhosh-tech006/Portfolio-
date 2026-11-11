import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { activeSection, isAdminLoggedIn } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly the 6 requested navigation links
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#000000]/95 backdrop-blur-md border-b border-[#292929] shadow-xl shadow-black/80 py-3.5'
          : 'bg-[#000000]/80 backdrop-blur-xs border-b border-[#292929]/50 py-4.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        
        {/* Brand: S. SANTHOSH */}
        <a
          href="#home"
          data-cursor="S. SANTHOSH"
          onClick={e => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#292929] text-white flex items-center justify-center font-bold text-xs tracking-tight group-hover:border-[#3B82F6] transition-colors">
            SS
          </div>
          <span className="font-bold tracking-tight text-white text-base leading-none whitespace-nowrap">
            S. SANTHOSH
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks.map(link => {
            const sectionKey = link.href.replace('#', '');
            const isActive =
              activeSection === sectionKey ||
              (sectionKey === 'home' && (activeSection === 'intro' || !activeSection));

            return (
              <a
                key={link.label}
                href={link.href}
                data-cursor={link.label}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`transition-colors whitespace-nowrap py-1 relative text-sm ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#3B82F6] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions: Admin + Contact Button */}
        <div className="flex items-center gap-3">
          {/* Admin toggle icon */}
          <button
            onClick={onOpenAdmin}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isAdminLoggedIn
                ? 'bg-[#181818] text-[#22D3EE] border border-[#3B82F6]'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#111111]'
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
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#111111] hover:bg-[#181818] border border-[#292929] hover:border-[#3B82F6] rounded-lg transition-all whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>Contact Me</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-[#111111] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#292929] bg-[#000000] px-4 py-4 shadow-2xl transition-all">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-medium py-2.5 px-3 rounded-lg text-[#A0A0A0] hover:text-white hover:bg-[#111111] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#292929]">
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-[#111111] border border-[#292929] hover:border-[#3B82F6] rounded-lg block"
              >
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
