'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { cardItem } from '@/lib/animations';
import type { Project } from '@/lib/types';

interface StandardProjectCardProps {
  project: Project;
}

function getTechStackArray(tech: Project['tech_stack']): string[] {
  if (Array.isArray(tech)) return tech;
  const vr = tech as {
    vr_client: string[];
    backend: string[];
    database: string;
    web_dashboard: string;
    quiz_analysis: string[];
  };
  return [...vr.vr_client, ...vr.backend, vr.database, vr.web_dashboard, ...vr.quiz_analysis];
}

function getPeriodString(period: Project['period']): string {
  if (typeof period === 'string') return period;
  return `${period.vr_build} · ${period.desktop_web_build}`;
}

export function StandardProjectCard({ project }: StandardProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const techStack = getTechStackArray(project.tech_stack);
  const period = getPeriodString(project.period);
  const links = project.links ?? {};
  const githubUrl = links.github ?? links.github_desktop_web;
  const liveUrl = links.live_app ?? links.live_backend;

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardItem}
      className="project-card"
      style={{ padding: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Header: categories + period */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {project.category.map((cat) => (
            <CategoryTag key={cat} label={cat} />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {period}
        </span>
      </div>

      {/* ID + Title */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '1rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-accent)',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}
          >
            {project.id}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'var(--text-heading-2)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
            }}
          >
            {project.name}
          </h3>
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          marginBottom: '20px',
          flexGrow: 1,
        }}
      >
        {project.tagline}
      </p>

      {/* One-liner */}
      {project.one_liner && (
        <div className="blockquote-accent" style={{ marginBottom: '20px', fontSize: 'var(--text-body-sm)' }}>
          {project.one_liner}
        </div>
      )}

      {/* Key features (top 4) */}
      <ul
        style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}
        aria-label="Key features"
      >
        {project.key_features.slice(0, 4).map((feature, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: '8px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontWeight: 600 }}>›</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <ul
        style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', listStyle: 'none', marginBottom: '20px' }}
        aria-label="Tech stack"
      >
        {techStack.slice(0, 8).map((tech) => (
          <li key={tech}>
            <span
              style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: '0.7rem',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-sunken)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '2px 7px',
              }}
            >
              {tech}
            </span>
          </li>
        ))}
      </ul>

      {/* Context: course or type */}
      {(project.course || project.type) && (
        <p
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
            letterSpacing: '0.04em',
          }}
        >
          {project.course ?? project.type}
          {project.team_size > 1 && ` · Team of ${project.team_size}`}
        </p>
      )}

      {/* Links */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: 'auto' }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub repository (opens in new tab)`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 'var(--text-label)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
          >
            <Github size={14} aria-hidden="true" />
            GitHub
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} live demo (opens in new tab)`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: 'var(--text-label)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
          >
            <ExternalLink size={14} aria-hidden="true" />
            Live
          </a>
        )}
      </div>
    </motion.article>
  );
}
