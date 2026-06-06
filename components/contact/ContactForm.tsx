'use client';

import { useState, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { slideUpFade } from '@/lib/animations';
import portfolioData from '@/lib/data';

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  describedBy?: string;
}

function FormField({ id, label, value, onChange, error, type = 'text', multiline = false, required = false, describedBy }: FieldProps) {
  const errorId = `${id}-error`;
  const hasValue = value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--color-bg-elevated)',
    border: `1px solid ${error ? 'var(--color-red)' : 'var(--color-border)'}`,
    borderRadius: '4px',
    padding: hasValue ? '24px 16px 8px' : '16px',
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: 'var(--text-body)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 150ms ease, padding 150ms ease',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '140px' : undefined,
  };

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    left: '16px',
    top: hasValue ? '8px' : '50%',
    transform: hasValue ? 'none' : 'translateY(-50%)',
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: hasValue ? 'var(--text-label)' : 'var(--text-body)',
    fontWeight: hasValue ? 500 : 400,
    letterSpacing: hasValue ? '0.06em' : 0,
    textTransform: hasValue ? 'uppercase' : 'none',
    color: error ? 'var(--color-red)' : hasValue ? 'var(--color-accent)' : 'var(--color-text-muted)',
    transition: 'all 150ms ease',
    pointerEvents: 'none',
    zIndex: 1,
  };

  if (multiline) {
    labelStyle.top = hasValue ? '8px' : '16px';
    labelStyle.transform = 'none';
  }

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-required={required}
          aria-describedby={[describedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          style={sharedStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLTextAreaElement).style.borderColor = error ? 'var(--color-red)' : 'var(--color-accent)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLTextAreaElement).style.borderColor = error ? 'var(--color-red)' : 'var(--color-border)';
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          aria-required={required}
          aria-describedby={[describedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined}
          aria-invalid={!!error}
          style={sharedStyle}
          onFocus={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = error ? 'var(--color-red)' : 'var(--color-accent)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.borderColor = error ? 'var(--color-red)' : 'var(--color-border)';
          }}
        />
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-label)',
            color: 'var(--color-red)',
            marginTop: '4px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const { personal } = portfolioData;
  const statusId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Name is required.';
    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!message.trim()) next.message = 'Message is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section-pad">
      <div className="content-width">
        <SectionHeading
          number="09"
          title="Get In Touch"
          subtitle="Open to full-time SDE, AI/ML, and research roles starting May/June 2026. Also happy to discuss collaborations, writing, or interesting ideas."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: '56px',
            alignItems: 'start',
          }}
        >
          {/* Left: form */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : slideUpFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <FormField
                id="contact-name"
                label="Name"
                value={name}
                onChange={setName}
                error={errors.name}
                required
              />
              <FormField
                id="contact-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                required
              />
              <FormField
                id="contact-subject"
                label="Subject (optional)"
                value={subject}
                onChange={setSubject}
              />
              <FormField
                id="contact-message"
                label="Message"
                value={message}
                onChange={setMessage}
                error={errors.message}
                multiline
                required
              />

              <div>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  ariaLabel={status === 'sending' ? 'Sending message…' : 'Send message'}
                >
                  <Send size={15} aria-hidden="true" />
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </Button>
              </div>

              {/* Status message */}
              <div
                id={statusId}
                role="status"
                aria-live="polite"
                style={{ minHeight: '24px' }}
              >
                {status === 'success' && (
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-green)',
                    }}
                  >
                    Message sent — thank you! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p
                    style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 'var(--text-body-sm)',
                      color: 'var(--color-red)',
                    }}
                  >
                    Something went wrong. Please email me directly at{' '}
                    <a href={`mailto:${personal.email.personal}`} style={{ color: 'var(--color-red)', textDecoration: 'underline' }}>
                      {personal.email.personal}
                    </a>.
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: contact info */}
          <motion.div
            variants={shouldReduceMotion ? fadeOnly : { ...slideUpFade, visible: { ...slideUpFade.visible as object, transition: { delay: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-heading-2)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-primary)',
                  marginBottom: '20px',
                }}
              >
                Direct Contact
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: Mail, label: 'Academic email', href: `mailto:${personal.email.academic}`, value: personal.email.academic },
                  { icon: Mail, label: 'Personal email', href: `mailto:${personal.email.personal}`, value: personal.email.personal },
                  { icon: Github, label: 'GitHub', href: personal.links.github, value: 'Aadityaamlan-Panda' },
                  { icon: Linkedin, label: 'LinkedIn', href: personal.links.linkedin, value: 'aadityaap22' },
                ].map(({ icon: Icon, label, href, value }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={`${label}: ${value}${href.startsWith('mailto') ? '' : ' (opens in new tab)'}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 150ms ease',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--color-border-subtle)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    <Icon size={16} aria-hidden="true" style={{ flexShrink: 0, color: 'var(--color-accent)' }} />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-dm-sans), sans-serif',
                          fontSize: 'var(--text-label)',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--color-text-muted)',
                          marginBottom: '1px',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: 'var(--text-body-sm)',
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability callout */}
            <div
              className="achievement-featured"
              style={{ borderRadius: '4px', padding: '20px 24px' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 'var(--text-body-lg)',
                  fontStyle: 'italic',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                }}
              >
                {personal.availability}
              </p>
            </div>

            {/* Notable quote */}
            <div className="blockquote-accent">
              {personal.notable_quote}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
