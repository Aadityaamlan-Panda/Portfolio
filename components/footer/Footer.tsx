'use client';

import portfolioData from '@/lib/data';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const { personal } = portfolioData;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-base)',
        paddingTop: '32px',
        paddingBottom: '32px',
      }}
    >
      <div
        className="content-width"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Name */}
        <span
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: '1.125rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          {personal.name}
        </span>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            flex: '1 1 auto',
          }}
        >
          Built with curiosity. Refined with rigor. Shipped with care.
        </p>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              padding: 0,
              margin: 0,
            }}
          >
            {navLinks.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)'; }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className="content-width"
        style={{ marginTop: '24px', textAlign: 'center' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-muted)',
          }}
        >
          © {new Date().getFullYear()} {personal.name} · Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
