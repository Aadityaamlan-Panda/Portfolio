'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-text-secondary)',
        borderRadius: '50%',
        transition: 'color 150ms ease, transform 300ms ease',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
      }}
    >
      <span
        style={{
          display: 'flex',
          transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'transform 300ms ease',
        }}
      >
        {theme === 'dark' ? (
          <Moon size={20} aria-hidden="true" />
        ) : (
          <Sun size={20} aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
