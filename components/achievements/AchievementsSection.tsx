'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCallout } from '@/components/projects/MetricCallout';
import { cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function AchievementsSection() {
  const shouldReduceMotion = useReducedMotion();
  const { achievements, key_metrics, personal } = portfolioData;

  return (
    <section id="achievements" className="section-pad">
      <div className="content-width">
        <SectionHeading
          number="06"
          title="Achievements"
          subtitle="Recognized for academic excellence, creative writing, and competitive weightlifting."
        />

        {/* Key metrics strip */}
        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '32px 0',
            marginBottom: '56px',
          }}
          role="group"
          aria-label="Key metrics"
        >
          {[
            { value: key_metrics.cpi_iit_kanpur, label: 'CPI at IIT Kanpur' },
            { value: `AIR ${key_metrics.jee_advanced_air.toLocaleString()}`, label: 'JEE Advanced 2022' },
            { value: `${key_metrics.academic_excellence_awards}×`, label: 'Excellence Awards' },
            { value: `${key_metrics.published_anthologies}`, label: "Int'l Anthologies" },
            { value: key_metrics.poems_written, label: 'Poems Written' },
          ].map((metric, i) => (
            <div
              key={metric.label}
              style={{ display: 'flex', alignItems: 'stretch', flex: 1, minWidth: '130px' }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: '1px',
                    backgroundColor: 'var(--color-border)',
                    alignSelf: 'stretch',
                    marginRight: '16px',
                  }}
                  aria-hidden="true"
                />
              )}
              <MetricCallout
                value={metric.value}
                label={metric.label}
                ariaLabel={`${metric.label}: ${metric.value}`}
              />
            </div>
          ))}
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '40px',
            alignItems: 'start',
          }}
        >
          {/* Academic Awards */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 'var(--text-heading-2)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '24px',
                letterSpacing: '-0.02em',
              }}
            >
              Academic
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {achievements.academic.map((award, i) => (
                <motion.div
                  key={i}
                  variants={shouldReduceMotion ? fadeOnly : cardItem}
                  className={i === 0 ? 'project-card achievement-featured' : 'project-card'}
                  style={{ padding: '20px 24px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '6px',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: 'var(--text-body)',
                        fontWeight: 500,
                        color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        lineHeight: 1.3,
                      }}
                    >
                      {award.award}
                    </h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: 'var(--text-label)',
                        color: 'var(--color-text-muted)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {award.year ?? (award.years ? award.years.join(', ') : '')}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {award.description}
                  </p>
                  {award.institution && (
                    <p
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: '0.65rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '6px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {award.institution}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: Literary + Sports */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Creative & Literary */}
            <motion.div
              variants={shouldReduceMotion ? fadeOnly : cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '24px',
                  letterSpacing: '-0.02em',
                }}
              >
                Creative & Literary
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {achievements.creative_literary.map((award, i) => (
                  <motion.div
                    key={i}
                    variants={shouldReduceMotion ? fadeOnly : cardItem}
                    className="project-card"
                    style={{ padding: '20px 24px' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '8px',
                        flexWrap: 'wrap',
                        marginBottom: '6px',
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: 'var(--text-body)',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {award.award}
                      </h4>
                      {award.year && (
                        <span
                          style={{
                            fontFamily: 'var(--font-jetbrains-mono), monospace',
                            fontSize: 'var(--text-label)',
                            color: 'var(--color-text-muted)',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          {award.year}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontSize: 'var(--text-body-sm)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {award.description}
                    </p>
                    {/* Anthology list (collapsed) */}
                    {award.publications && (
                      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {award.publications.slice(0, 5).map((pub) => (
                          <span
                            key={pub.title}
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                              fontSize: 'var(--text-label)',
                              color: 'var(--color-text-muted)',
                              backgroundColor: 'var(--color-bg-sunken)',
                              border: '1px solid var(--color-border-subtle)',
                              borderRadius: '4px',
                              padding: '2px 7px',
                            }}
                          >
                            {pub.title}
                          </span>
                        ))}
                        {award.publications.length > 5 && (
                          <span
                            style={{
                              fontFamily: 'var(--font-dm-sans), sans-serif',
                              fontSize: 'var(--text-label)',
                              color: 'var(--color-text-muted)',
                              padding: '2px 0',
                            }}
                          >
                            +{award.publications.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                    {award.publication && (
                      <p
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: '0.65rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '6px',
                        }}
                      >
                        {award.publication}
                        {award.translated_work && ` · "${award.translated_work}"`}
                      </p>
                    )}
                    {award.institution && !award.publication && (
                      <p
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: '0.65rem',
                          color: 'var(--color-text-muted)',
                          marginTop: '6px',
                        }}
                      >
                        {award.institution}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sports */}
            <motion.div
              variants={shouldReduceMotion ? fadeOnly : cardStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '24px',
                  letterSpacing: '-0.02em',
                }}
              >
                Sports
              </h3>

              {/* Sports photo */}
              <Image
                src="/images/achievements/weightlifting-udghosh.jpg"
                alt="Weightlifting competition — Udghosh 2024"
                width={800}
                height={140}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  marginBottom: '16px',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)',
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {achievements.sports.map((award, i) => (
                  <motion.div
                    key={i}
                    variants={shouldReduceMotion ? fadeOnly : cardItem}
                    className="project-card"
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: 'var(--text-body-sm)',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)',
                          marginBottom: '3px',
                        }}
                      >
                        {award.award} — {award.competition}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: 'var(--text-label)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {award.details}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-jetbrains-mono), monospace',
                        fontSize: 'var(--text-label)',
                        color: 'var(--color-text-muted)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {award.year}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
