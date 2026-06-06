'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Mail, Github, Linkedin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideUpFade, cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const { personal, education } = portfolioData;
  const iitk = education[0];
  const school = education[1];

  return (
    <section id="about" className="section-pad">
      <div className="content-width">
        <SectionHeading
          number="03"
          title="About"
          subtitle="Engineer, researcher, poet, and competitive weightlifter — built at the intersection of chemical engineering and AI."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Left: Bio + links */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : slideUpFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Profile photo */}
            <Image
              src="/images/profile/about-photo.jpg"
              alt="Aadityaamlan Panda"
              width={420}
              height={280}
              style={{
                width: '100%',
                maxWidth: '420px',
                height: '280px',
                objectFit: 'cover',
                marginBottom: '32px',
                borderRadius: '4px',
                border: '1px solid var(--color-border)',
              }}
            />

            {/* Bio */}
            <p
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.75,
                marginBottom: '24px',
              }}
            >
              {personal.bio_long}
            </p>

            {/* Notable quote */}
            <div className="blockquote-accent" style={{ marginBottom: '32px' }}>
              {personal.notable_quote}
            </div>

            {/* Contact links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              {[
                { icon: Github, href: personal.links.github, label: 'GitHub' },
                { icon: Linkedin, href: personal.links.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personal.email.personal}`, label: personal.email.personal },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  aria-label={`${label}${href.startsWith('mailto') ? '' : ' (opens in new tab)'}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                  }}
                >
                  <Icon size={15} aria-hidden="true" />
                  {label}
                </a>
              ))}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <MapPin size={13} aria-hidden="true" />
                {personal.current_location}
              </div>
            </div>
          </motion.div>

          {/* Right: Education + Experience + Languages + Interests */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Education */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                }}
              >
                Education
              </h3>

              {/* IITK */}
              <div
                className="project-card"
                style={{ padding: '24px', marginBottom: '16px' }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'var(--text-heading-3)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {iitk.institution}
                  </h4>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 'var(--text-label)',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {iitk.period}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: '4px',
                  }}
                >
                  {iitk.degree} in {iitk.field} · Minor in {iitk.minor}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-accent)',
                    fontWeight: 500,
                    marginBottom: '12px',
                  }}
                >
                  CPI {iitk.gpa}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {(iitk.activities ?? []).map((act) => (
                    <span
                      key={act}
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: 'var(--text-label)',
                        color: 'var(--color-text-muted)',
                        backgroundColor: 'var(--color-bg-sunken)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                      }}
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>

              {/* School */}
              <div className="project-card" style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'var(--text-heading-3)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {school.institution}
                  </h4>
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 'var(--text-label)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {school.location}
                  </span>
                </div>
                <dl
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4px 16px',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                  }}
                >
                  <dt style={{ color: 'var(--color-text-muted)' }}>
                    {school.board_12th} {school.year_12th}
                  </dt>
                  <dd style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                    {school.score_12th}
                  </dd>
                  <dt style={{ color: 'var(--color-text-muted)' }}>
                    {school.board_10th} {school.year_10th}
                  </dt>
                  <dd style={{ color: 'var(--color-accent)', fontWeight: 500 }}>
                    {school.score_10th}
                  </dd>
                </dl>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                Languages
              </h3>
              <dl style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {personal.languages.map(({ language, proficiency }) => (
                  <div key={language} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                    <dt
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--color-text-primary)',
                        fontWeight: 500,
                      }}
                    >
                      {language}
                    </dt>
                    <dd
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--color-text-muted)',
                        textAlign: 'right',
                      }}
                    >
                      {proficiency}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            {/* Interests */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em',
                }}
              >
                Interests
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {personal.interests.map((interest) => (
                  <span
                    key={interest}
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-bg-elevated)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      padding: '5px 12px',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <div
                className="achievement-featured"
                style={{ borderRadius: '4px', padding: '20px 24px' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>Availability: </span>
                  {personal.availability}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
