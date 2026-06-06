'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cardStagger, cardItem } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

interface SkillGroupProps {
  title: string;
  skills: string[];
  accent?: boolean;
}

function SkillGroup({ title, skills, accent = false }: SkillGroupProps) {
  return (
    <div>
      <h3
        style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: accent ? 'var(--color-accent)' : 'var(--color-text-muted)',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>
      <dl>
        <dt className="sr-only">{title} skills</dt>
        <dd>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((skill) => (
              <span key={skill} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </dd>
      </dl>
    </div>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const { skills } = portfolioData;

  const groups = [
    { title: 'AI · ML · Data Science', skills: skills.ai_ml_data_science, accent: true },
    { title: 'Programming Languages', skills: skills.programming_languages, accent: false },
    { title: 'Backend · APIs', skills: skills.backend_apis, accent: false },
    { title: 'XR · Game · 3D', skills: skills.xr_game_3d, accent: true },
    { title: 'Frontend · Web', skills: skills.frontend_web, accent: false },
    { title: 'Chemical Engineering Tools', skills: skills.chemical_engineering_tools, accent: true },
    { title: 'Audio · Video', skills: skills.audio_video, accent: false },
    { title: 'DevOps · Tools', skills: skills.devops_tools, accent: false },
  ];

  return (
    <section id="skills" className="section-pad" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
      <div className="content-width">
        <SectionHeading
          number="04"
          title="Skills"
          subtitle="A broad stack spanning AI/ML systems, XR development, chemical process simulation, and full-stack engineering."
        />

        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={shouldReduceMotion ? fadeOnly : cardItem}
            >
              <SkillGroup
                title={group.title}
                skills={group.skills}
                accent={group.accent}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          variants={shouldReduceMotion ? fadeOnly : cardItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            marginTop: '56px',
            paddingTop: '40px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '32px',
          }}
          role="group"
          aria-label="Skill counts by category"
        >
          {[
            { value: skills.programming_languages.length.toString(), label: 'Languages' },
            { value: skills.ai_ml_data_science.length.toString(), label: 'AI/ML Libraries' },
            { value: skills.chemical_engineering_tools.length.toString(), label: 'ChE Tools' },
            { value: skills.backend_apis.length.toString(), label: 'Backend / API Tools' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: 'var(--text-label)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-muted)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
