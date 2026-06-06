'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Github, BookOpen, FileText, PenTool } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideUpFade, cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function WritingSection() {
  const shouldReduceMotion = useReducedMotion();
  const { creative_writing, personal, achievements } = portfolioData;

  const stats = [
    { value: `${creative_writing.poetry_count}+`, label: 'Poems', icon: PenTool },
    { value: `${creative_writing.stories_count}`, label: 'Stories', icon: FileText },
    { value: `${creative_writing.articles_count}`, label: 'Articles', icon: FileText },
    { value: `${achievements.creative_literary.filter((a) => a.award === '10 Co-authored International Anthologies').length > 0 ? '10' : '10'}`, label: 'Anthologies', icon: BookOpen },
  ];

  return (
    <section
      id="writing"
      className="section-pad"
      style={{ backgroundColor: 'var(--color-bg-elevated)' }}
    >
      <div className="content-width">
        <SectionHeading
          number="08"
          title="Writing"
          subtitle="A poet, critic, and literary transliterator — published across 10 international anthologies."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          {/* Left: quote + summary */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : slideUpFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Notable quote */}
            <blockquote
              className="blockquote-accent"
              style={{ marginBottom: '36px' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.65,
                  maxWidth: '52ch',
                }}
              >
                &ldquo;{personal.notable_quote}&rdquo;
              </p>
              <footer
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-muted)',
                  marginTop: '12px',
                }}
              >
                — Aadityaamlan Panda
              </footer>
            </blockquote>

            <p
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-body-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.75,
                marginBottom: '32px',
                maxWidth: '62ch',
              }}
            >
              {creative_writing.summary}
            </p>

            {/* Notable achievements */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '36px',
              }}
            >
              {[
                'International Rank 7 — Storymirror World Writing Championship 2023',
                'Sole Odia-to-English translator in Matruakshar International Journal Vol. I',
                'Literary Captain — Storymirror, Jul 2021',
                'Suryodaya Youth Icon Award — International Youth Icon 2022-23',
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-accent)',
                      flexShrink: 0,
                      fontWeight: 600,
                    }}
                  >
                    ›
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {/* GitHub link */}
            <a
              href={creative_writing.github_repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Creative Writing repository on GitHub (opens in new tab)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'var(--text-label)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                border: '1.5px solid var(--color-accent)',
                borderRadius: '6px',
                padding: '10px 20px',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              <Github size={16} aria-hidden="true" />
              Read My Writing
            </a>
          </motion.div>

          {/* Right: stats + selected poems + anthologies */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
          >
            {/* Stats */}
            <motion.div
              variants={shouldReduceMotion ? fadeOnly : cardItem}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                borderTop: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
                padding: '24px 0',
                gap: '0',
              }}
              role="group"
              aria-label="Writing statistics"
            >
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  style={{
                    textAlign: 'center',
                    padding: '0 8px',
                    borderLeft: i > 0 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {value}
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
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Selected poems */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                }}
              >
                Selected Poems
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                {creative_writing.selected_poems.map((poem) => (
                  <li
                    key={poem}
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'var(--text-body)',
                      fontStyle: 'italic',
                      color: 'var(--color-text-secondary)',
                      paddingLeft: '12px',
                      borderLeft: '2px solid var(--color-border)',
                      lineHeight: 1.45,
                    }}
                  >
                    {poem}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Translations */}
            <motion.div variants={shouldReduceMotion ? fadeOnly : cardItem}>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '16px',
                }}
              >
                Literary Translation
              </h3>
              {creative_writing.translations.map((t) => (
                <div
                  key={t.title}
                  className="project-card"
                  style={{ padding: '20px 24px' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 'var(--text-body-lg)',
                      fontStyle: 'italic',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    &ldquo;{t.title}&rdquo;
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-accent)',
                      marginBottom: '4px',
                    }}
                  >
                    {t.direction}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: '0.7rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t.published_in}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '8px',
                      fontStyle: 'italic',
                    }}
                  >
                    {t.note}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
