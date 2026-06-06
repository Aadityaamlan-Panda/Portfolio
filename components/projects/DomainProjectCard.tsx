'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Github } from 'lucide-react';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { cardItem } from '@/lib/animations';
import type { Project } from '@/lib/types';

interface DomainProjectCardProps {
  project: Project;
}

function getTechStackArray(tech: Project['tech_stack']): string[] {
  if (Array.isArray(tech)) return tech;
  return [];
}

function getPeriodString(period: Project['period']): string {
  if (typeof period === 'string') return period;
  return `${period.vr_build}`;
}

export function DomainProjectCard({ project }: DomainProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const techStack = getTechStackArray(project.tech_stack);
  const period = getPeriodString(project.period);
  const githubUrl = project.links?.github;

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardItem}
      className="project-card"
      style={{ padding: '28px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* ID + category row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {project.category.slice(0, 2).map((cat) => (
            <CategoryTag key={cat} label={cat} size="sm" />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.1rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-accent)',
            opacity: 0.7,
            flexShrink: 0,
          }}
        >
          {project.id}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'var(--text-heading-3)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text-primary)',
          lineHeight: 1.25,
          marginBottom: '10px',
        }}
      >
        {project.name}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: '14px',
          flexGrow: 1,
        }}
      >
        {project.tagline}
      </p>

      {/* Course / context */}
      {(project.course || project.type) && (
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.65rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
            marginBottom: '12px',
          }}
        >
          {project.course ?? project.type}
          {project.supervisor ? ` · ${project.supervisor}` : ''}
        </p>
      )}

      {/* Period + team */}
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '0.65rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.04em',
          marginBottom: '12px',
        }}
      >
        {period}
        {project.team_size > 1 ? ` · Team of ${project.team_size}` : ' · Solo'}
      </p>

      {/* Tech stack (compact) */}
      {techStack.length > 0 && (
        <ul
          style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', listStyle: 'none', marginBottom: '14px' }}
          aria-label="Tech stack"
        >
          {techStack.slice(0, 5).map((tech) => (
            <li key={tech}>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.65rem',
                  color: 'var(--color-text-muted)',
                  backgroundColor: 'var(--color-bg-sunken)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: '2px',
                  padding: '1px 6px',
                }}
              >
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Key features — top 2 */}
      <ul
        style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}
        aria-label="Key features"
      >
        {project.key_features.slice(0, 2).map((feature, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '7px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.45,
            }}
          >
            <span style={{ color: 'var(--color-accent)', flexShrink: 0, opacity: 0.7 }}>›</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* GitHub link */}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} GitHub repository (opens in new tab)`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-label)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            transition: 'color 150ms ease',
            marginTop: 'auto',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-muted)';
          }}
        >
          <Github size={12} aria-hidden="true" />
          GitHub
        </a>
      )}
    </motion.article>
  );
}
