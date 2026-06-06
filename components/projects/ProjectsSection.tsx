'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { StandardProjectCard } from './StandardProjectCard';
import { DomainProjectCard } from './DomainProjectCard';
import { cardStagger } from '@/lib/animations';
import portfolioData from '@/lib/data';
import type { Project } from '@/lib/types';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();
  const { projects } = portfolioData;

  const flagship = projects.filter((p: Project) => p.tier === 'flagship');
  const strongSde = projects.filter((p: Project) => p.tier === 'strong_sde');
  const domain = projects.filter((p: Project) => p.tier === 'domain_engineering');

  return (
    <section id="projects" className="section-pad">
      <div className="content-width">
        <SectionHeading
          number="02"
          title="Selected Work"
          subtitle="17 projects spanning transparent AI systems, XR learning tools, full-stack applications, and industrial process simulation."
        />

        {/* ── Tier 1: Flagship Projects ── */}
        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ marginBottom: '80px' }}
        >
          {flagship.map((project: Project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* ── Tier 2: Strong SDE Projects ── */}
        <div style={{ marginBottom: '80px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-heading-3)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
              }}
            >
              AI &amp; Software Projects
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
              }}
            >
              Projects 03–08
            </span>
          </div>

          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
              gap: '32px',
            }}
          >
            {strongSde.map((project: Project) => (
              <StandardProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>

        {/* ── Tier 3: Domain / Engineering Projects ── */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-heading-3)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
              }}
            >
              Engineering &amp; Domain Projects
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
              }}
            >
              Projects 09–17
            </span>
          </div>

          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
              gap: '24px',
            }}
          >
            {domain.map((project: Project) => (
              <DomainProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
