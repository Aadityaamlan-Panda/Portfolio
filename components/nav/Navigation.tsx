'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navFadeIn, mobileMenuOverlay } from '@/lib/animations';
import portfolioData from '@/lib/data';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const shouldReduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { personal } = portfolioData;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        variants={shouldReduceMotion ? undefined : navFadeIn}
        initial="hidden"
        animate="visible"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled ? 'var(--color-bg-elevated)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-subtle)' : 'none',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
        <div
          className="content-width"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            aria-label="Back to top — Aadityaamlan Panda"
          >
            <span
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: '1.5rem',
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              AP
            </span>
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-secondary)',
                display: 'none',
              }}
              className="hidden sm:block"
            >
              {personal.name}
            </span>
          </a>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
            className="hidden lg:flex"
          >
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </a>
              );
            })}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-label)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                border: '1.5px solid var(--color-accent)',
                borderRadius: '6px',
                padding: '8px 16px',
                textDecoration: 'none',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              Resume
            </a>

            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="flex lg:hidden">
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                borderRadius: '4px',
              }}
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-label="Navigation menu"
            variants={shouldReduceMotion ? undefined : mobileMenuOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              backgroundColor: 'var(--color-bg-elevated)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              paddingTop: '64px',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontWeight: 600,
                  fontSize: '2.5rem',
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)';
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-label)',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                border: '1.5px solid var(--color-accent)',
                borderRadius: '6px',
                padding: '12px 28px',
                textDecoration: 'none',
                marginTop: '16px',
              }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
