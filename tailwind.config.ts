import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--color-bg-base)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'bg-sunken': 'var(--color-bg-sunken)',
        'bg-overlay': 'var(--color-bg-overlay)',
        'border-col': 'var(--color-border)',
        'border-subtle': 'var(--color-border-subtle)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'accent': 'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        'tag-ai': 'var(--color-tag-ai)',
        'tag-ai-text': 'var(--color-tag-ai-text)',
        'tag-xr': 'var(--color-tag-xr)',
        'tag-xr-text': 'var(--color-tag-xr-text)',
        'tag-che': 'var(--color-tag-che)',
        'tag-che-text': 'var(--color-tag-che-text)',
        'col-green': 'var(--color-green)',
        'col-red': 'var(--color-red)',
        'col-blue': 'var(--color-blue)',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        48: '192px',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'chevron-bounce': 'chevronBounce 2s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        chevronBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(10px, -15px)' },
          '50%': { transform: 'translate(-5px, -10px)' },
          '75%': { transform: 'translate(8px, 5px)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
