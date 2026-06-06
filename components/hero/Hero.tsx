'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ChevronDown } from 'lucide-react';
import { Typewriter } from './Typewriter';
import { KeywordCloud } from './KeywordCloud';
import { Button } from '@/components/ui/Button';
import { heroName, heroRole, heroTagline, heroCta } from '@/lib/animations';
import portfolioData from '@/lib/data';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { personal } = portfolioData;

  const roleTags = [
    'Chemical Engineering @ IIT Kanpur',
    'AI/ML',
    'Process Design',
    'XR / VR',
    'Writer & Poet',
  ];

  const fadeOnly = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.15 } },
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
      }}
    >
      {/* Radial glow */}
      <div
        className="hero-glow"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden="true"
      />

      <div
        className="content-width hero-grid"
        style={{
          width: '100%',
          paddingTop: '80px',
          paddingBottom: '80px',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          {/* Oversized background number */}
          <span
            className="section-number"
            aria-hidden="true"
            style={{ top: '-0.5em', left: '-0.15em', fontSize: 'clamp(6rem, 15vw, 12rem)' }}
          >
            01
          </span>

          {/* Name */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroName}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'var(--text-hero-name)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.0,
                marginBottom: '4px',
              }}
            >
              {personal.name}
            </h1>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroRole}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', marginTop: '8px' }}
          >
            <MapPin size={13} style={{ color: 'var(--color-accent)', flexShrink: 0 }} aria-hidden="true" />
            <span
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {personal.current_location}
            </span>
          </motion.div>

          {/* Role tags */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroRole}
            initial="hidden"
            animate="visible"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
              {roleTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-label)',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    padding: '5px 12px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroTagline}
            initial="hidden"
            animate="visible"
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'var(--text-hero-tagline)',
                fontStyle: 'italic',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                maxWidth: '52ch',
                marginBottom: '24px',
              }}
            >
              {personal.tagline}
            </p>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroTagline}
            initial="hidden"
            animate="visible"
            style={{ marginBottom: '40px', minHeight: '60px' }}
          >
            <Typewriter options={personal.typewriter_options} />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroCta}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
          >
            <Button
              variant="primary"
              href="#projects"
              onClick={() => {
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel="GitHub profile (opens in new tab)"
            >
              <Github size={16} aria-hidden="true" />
              GitHub
            </Button>
            <Button
              variant="text"
              href="#contact"
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in touch
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : heroCta}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', gap: '20px', marginTop: '32px' }}
          >
            {[
              { icon: Github, href: personal.links.github, label: 'GitHub' },
              { icon: Linkedin, href: personal.links.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personal.email.personal}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={`${label}${href.startsWith('mailto') ? '' : ' (opens in new tab)'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-body-sm)',
                  textDecoration: 'none',
                  transition: 'color 150ms ease, transform 150ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'var(--color-accent)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = 'var(--color-text-muted)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right column — Profile photo placeholder */}
        <div
          className="hero-photo-col"
        >
          <KeywordCloud />
          <Image
            src="/images/profile/hero-portrait.jpg"
            alt="Aadityaamlan Panda"
            width={420}
            height={520}
            priority
            style={{
              width: '420px',
              maxWidth: '100%',
              height: '520px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '2px solid var(--color-accent)',
              boxShadow: '0 0 40px var(--color-accent-glow)',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '0.6875rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          Scroll
        </span>
        <ChevronDown
          size={18}
          style={{ color: 'var(--color-text-muted)', animation: 'chevronBounce 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  );
}
