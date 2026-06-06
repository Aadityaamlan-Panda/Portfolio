'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { sectionHeading, sectionNumber } from '@/lib/animations';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeading({ number, title, subtitle, id }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div style={{ position: 'relative', marginBottom: '48px', paddingTop: '2rem' }} id={id}>
      {/* Background number decoration */}
      <motion.span
        className="section-number"
        variants={shouldReduceMotion ? fadeOnly : sectionNumber}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ top: '0', left: '-0.1em' }}
        aria-hidden="true"
      >
        {number}
      </motion.span>

      <motion.div
        variants={shouldReduceMotion ? fadeOnly : sectionHeading}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ position: 'relative', zIndex: 1, paddingTop: '1.2rem' }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'var(--text-display)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              marginTop: '12px',
              maxWidth: '56ch',
              lineHeight: 1.7,
            }}
          >
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
