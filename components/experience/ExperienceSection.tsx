'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideUpFade, cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

const metricStyle = {
  dt: {
    fontFamily: 'var(--font-cormorant), serif',
    fontSize: '1.75rem',
    fontWeight: 300,
    fontStyle: 'italic' as const,
    color: 'var(--color-accent)',
    lineHeight: 1,
  },
  dd: {
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: 'var(--text-label)',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    color: 'var(--color-text-muted)',
    marginTop: '3px',
  },
};

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-pad">
      <div className="content-width">
        <SectionHeading
          number="05"
          title="Experience"
          subtitle="Professional work and industry engagement beyond the classroom."
        />

        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {experience.map((exp, i) => (
            <motion.article
              key={i}
              variants={shouldReduceMotion ? fadeOnly : cardItem}
              className="project-card"
              style={{
                padding: '32px',
                borderLeft: '3px solid var(--color-accent)',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '6px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'var(--text-heading-2)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {exp.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 'var(--text-label)',
                    color: 'var(--color-text-muted)',
                    whiteSpace: 'nowrap',
                    paddingTop: '4px',
                  }}
                >
                  {exp.period}
                </span>
              </div>

              {/* Company + location */}
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-accent)',
                  marginBottom: '4px',
                  fontWeight: 500,
                }}
              >
                {exp.company}
              </p>
              {exp.location && (
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: '20px',
                  }}
                >
                  {exp.location}
                </p>
              )}

              {/* Highlights */}
              <ul
                style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}
                aria-label="Key highlights"
              >
                {(exp.highlights ?? []).map((h, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '1px' }}>›</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Impact metrics */}
              {exp.impact_metrics && (
                <dl
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '32px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                  aria-label="Impact metrics"
                >
                  <div>
                    <dt style={metricStyle.dt}>{exp.impact_metrics.prototypes_built}</dt>
                    <dd style={metricStyle.dd}>Prototypes Built</dd>
                  </div>
                  <div>
                    <dt style={metricStyle.dt}>{exp.impact_metrics.hackathon_teams_enabled}</dt>
                    <dd style={metricStyle.dd}>Teams Enabled</dd>
                  </div>
                  <div>
                    <dt style={metricStyle.dt}>{exp.impact_metrics.problem_statements}</dt>
                    <dd style={metricStyle.dd}>Problem Statements</dd>
                  </div>
                  <div>
                    <dt style={metricStyle.dt}>{exp.impact_metrics.frontend_complexity_reduction}</dt>
                    <dd style={metricStyle.dd}>Complexity Reduction</dd>
                  </div>
                </dl>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* Positions of Responsibility */}
        <motion.div
          variants={shouldReduceMotion ? fadeOnly : slideUpFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ marginTop: '64px' }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'var(--text-heading-1)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Positions of Responsibility
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '16px',
            }}
          >
            {[
              { role: 'Secretary, UG Academics', org: 'AnC Council, IIT Kanpur', period: '2023–2024' },
              { role: 'WebD Projects Lead', org: 'AnC Council, IIT Kanpur', period: '2023–2024' },
              { role: 'Student Mentor', org: 'Udghosh Sports Fest, IIT Kanpur', period: '2023, 2024' },
              { role: 'Weightlifting Team Captain', org: 'Inter-IIT Sports Meet', period: '2023, 2024' },
            ].map(({ role, org, period }) => (
              <div
                key={role}
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '20px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-label)',
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                  }}
                >
                  {org}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 'var(--text-label)',
                    color: 'var(--color-accent)',
                  }}
                >
                  {period}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
