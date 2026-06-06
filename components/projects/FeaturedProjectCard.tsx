'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { CategoryTag } from '@/components/ui/CategoryTag';
import { MetricCallout } from './MetricCallout';
import { cardItem } from '@/lib/animations';
import type { Project } from '@/lib/types';

interface FeaturedProjectCardProps {
  project: Project;
}

function getTechStackArray(tech: Project['tech_stack']): string[] {
  if (Array.isArray(tech)) return tech;
  const vr = tech as {
    vr_client: string[];
    backend: string[];
    database: string;
    orm: string;
    web_dashboard: string;
    quiz_analysis: string[];
    deployment: string[];
    build_targets: string[];
  };
  return [
    ...vr.vr_client,
    ...vr.backend,
    vr.database,
    vr.web_dashboard,
    ...vr.quiz_analysis,
  ];
}

function getPeriodString(period: Project['period']): string {
  if (typeof period === 'string') return period;
  return `${period.vr_build} + ${period.desktop_web_build}`;
}

function getProjectMetrics(project: Project): Array<{ value: string; label: string }> {
  if (project.id === '01') {
    return [
      { value: '0.87', label: 'Context Precision' },
      { value: '0.75', label: 'Context Recall' },
      { value: '43', label: 'Tests Passing' },
      { value: '~1 GB', label: 'Knowledge Base' },
    ];
  }
  if (project.id === '02') {
    return [
      { value: '+7.7pp', label: 'Quiz Accuracy Gain' },
      { value: '60.8%', label: 'Faster Response' },
      { value: '114', label: 'ChE Concepts' },
      { value: '9', label: 'API Endpoints' },
    ];
  }
  return [];
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const techStack = getTechStackArray(project.tech_stack);
  const period = getPeriodString(project.period);
  const metrics = getProjectMetrics(project);

  const links = project.links ?? {};
  const githubUrl = links.github ?? links.github_desktop_web;
  const liveUrl = links.live_app ?? links.live_backend;

  return (
    <motion.article
      variants={shouldReduceMotion ? undefined : cardItem}
      className="project-card"
      style={{ padding: '40px', marginBottom: '40px' }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.category.map((cat) => (
            <CategoryTag key={cat} label={cat} size="md" />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {period} · {project.type ?? `Team of ${project.team_size}`}
        </span>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <span
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: '1.25rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-accent)',
              letterSpacing: '-0.02em',
            }}
          >
            {project.id}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'var(--text-heading-1)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h3>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontStyle: 'italic',
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-secondary)',
            marginTop: '8px',
            maxWidth: '70ch',
            lineHeight: 1.6,
          }}
        >
          {project.tagline}
        </p>
      </div>

      {/* Project screenshot */}
      <Image
        src={`/images/projects/${project.id === '01' ? 'rag-terminal-ui' : 'vr-memory-palace'}.png`}
        alt={`Screenshot of ${project.name}`}
        width={1280}
        height={720}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          objectFit: 'cover',
          marginBottom: '32px',
          backgroundColor: 'var(--color-bg-sunken)',
          borderRadius: '4px',
        }}
      />

      {/* Problem */}
      {project.problem && (
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-body-lg)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            marginBottom: '32px',
            maxWidth: '68ch',
          }}
        >
          {project.problem}
        </p>
      )}

      {/* One-liner blockquote */}
      {project.one_liner && (
        <div className="blockquote-accent" style={{ marginBottom: '32px' }}>
          {project.one_liner}
        </div>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '24px 0',
            marginBottom: '32px',
          }}
          role="group"
          aria-label="Key performance metrics"
        >
          {metrics.map((metric, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', flex: 1, minWidth: '120px' }}>
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
        </div>
      )}

      {/* Key features */}
      <div style={{ marginBottom: '32px' }}>
        <h4
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-heading-3)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: '16px',
          }}
        >
          Key Features
        </h4>
        <ul
          style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '8px',
          }}
          aria-label="Key features"
        >
          {project.key_features.slice(0, 6).map((feature, i) => (
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
      </div>

      {/* Tech stack */}
      <div style={{ marginBottom: '24px' }}>
        <ul
          style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', listStyle: 'none' }}
          aria-label="Tech stack"
        >
          {techStack.slice(0, 10).map((tech) => (
            <li key={tech}>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-bg-sunken)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  padding: '3px 8px',
                }}
              >
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub repository (opens in new tab)`}
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
              transition: 'color 150ms ease',
            }}
          >
            <Github size={16} aria-hidden="true" />
            View on GitHub
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
              gap: '8px',
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
            <ExternalLink size={16} aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}
