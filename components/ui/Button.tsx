'use client';

import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'outlined' | 'text';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  target,
  rel,
  ariaLabel,
  type = 'button',
  disabled,
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '6px',
    fontFamily: 'var(--font-dm-sans), sans-serif',
    fontSize: 'var(--text-label)',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textDecoration: 'none',
    border: 'none',
    minHeight: '44px',
    padding: '12px 24px',
    whiteSpace: 'nowrap',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-bg-base)',
    },
    outlined: {
      backgroundColor: 'transparent',
      border: '1.5px solid var(--color-accent)',
      color: 'var(--color-accent)',
    },
    text: {
      backgroundColor: 'transparent',
      color: 'var(--color-accent)',
      padding: '12px 0',
    },
  };

  const style = { ...baseStyle, ...variants[variant] };

  if (href) {
    return (
      <a
        href={href}
        style={style}
        className={className}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
        {variant === 'text' && <ArrowRight size={14} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
      {variant === 'text' && <ArrowRight size={14} aria-hidden="true" />}
    </button>
  );
}
