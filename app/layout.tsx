import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import portfolioData from '@/lib/data';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const { personal } = portfolioData;

export const metadata: Metadata = {
  title: `${personal.name} — Chemical Engineering, AI/ML & XR`,
  description: personal.bio_short,
  keywords: [
    'Aadityaamlan Panda',
    'IIT Kanpur',
    'Chemical Engineering',
    'AI ML',
    'RAG pipeline',
    'VR Memory Palace',
    'portfolio',
    'Ajai Agarwal Memorial Prize',
  ],
  authors: [{ name: personal.name, url: personal.links.github }],
  openGraph: {
    title: `${personal.name} — Portfolio`,
    description: personal.tagline,
    url: personal.links.portfolio,
    siteName: personal.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personal.name} — Portfolio`,
    description: personal.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
        style={{
          fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-primary)',
        }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
