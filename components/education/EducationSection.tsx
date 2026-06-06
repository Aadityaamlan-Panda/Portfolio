'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion();
  const { education } = portfolioData;
  const iitk = education[0];
  const courses = iitk.relevant_courses;

  const courseGroups = courses
    ? [
        { label: 'Mathematics', items: courses.mathematics },
        { label: 'Computing', items: courses.computing },
        { label: 'Chemical Engineering', items: courses.chemical_engineering },
        { label: 'Economics', items: courses.economics },
      ]
    : [];

  return (
    <section id="education" className="section-pad" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
      <div className="content-width">
        <SectionHeading
          number="07"
          title="Education"
          subtitle="Four years at IIT Kanpur across chemical engineering, mathematics, computing, and economics."
        />

        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* IIT Kanpur featured card */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardItem}
            className="project-card"
            style={{ padding: '36px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'var(--text-heading-1)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                  }}
                >
                  {iitk.institution}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {iitk.degree} in {iitk.field} · Minor in {iitk.minor}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {iitk.gpa}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-label)',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                  }}
                >
                  CPI
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '32px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {iitk.period}
              </span>
              <span style={{ color: 'var(--color-border)', fontSize: '0.7rem' }}>·</span>
              <span
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {iitk.location}
              </span>
            </div>

            {/* Relevant Courses grid */}
            <h4
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-label)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-text-muted)',
                marginBottom: '20px',
              }}
            >
              Relevant Coursework
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '24px',
              }}
            >
              {courseGroups.map(({ label, items }) => (
                <div key={label}>
                  <h5
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-label)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-accent)',
                      marginBottom: '10px',
                    }}
                  >
                    {label}
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {items.map((course) => (
                      <li
                        key={course}
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: 'var(--text-body-sm)',
                          color: 'var(--color-text-secondary)',
                          display: 'flex',
                          gap: '7px',
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ color: 'var(--color-border)', flexShrink: 0 }}>—</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Activities */}
            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-label)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                Activities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {(iitk.activities ?? []).map((act) => (
                  <span
                    key={act}
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-bg-sunken)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      padding: '4px 12px',
                    }}
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* School card */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardItem}
            className="project-card"
            style={{ padding: '28px 36px' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    fontSize: 'var(--text-heading-2)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {education[1].institution}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {education[1].location}
                </p>
              </div>
              <dl
                style={{
                  display: 'flex',
                  gap: '24px',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '1.75rem',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                    }}
                  >
                    {education[1].score_12th}
                  </dt>
                  <dd
                    style={{
                      fontSize: 'var(--text-label)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-text-muted)',
                      marginTop: '3px',
                    }}
                  >
                    {education[1].board_12th} ({education[1].year_12th})
                  </dd>
                </div>
                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: '1.75rem',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                    }}
                  >
                    {education[1].score_10th}
                  </dt>
                  <dd
                    style={{
                      fontSize: 'var(--text-label)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-text-muted)',
                      marginTop: '3px',
                    }}
                  >
                    {education[1].board_10th} ({education[1].year_10th})
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
