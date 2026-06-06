'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface MetricCalloutProps {
  value: string;
  label: string;
  ariaLabel?: string;
}

export function MetricCallout({ value, label, ariaLabel }: MetricCalloutProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Extract numeric prefix for counting animation
  const numericMatch = value.match(/^([<>~]?\d+\.?\d*)/);
  const prefix = value.match(/^[<>~]/) ? value[0] : '';
  const numericValue = numericMatch ? parseFloat(numericMatch[1].replace(/[<>~]/, '')) : null;
  const suffix = numericValue !== null ? value.replace(numericMatch![1], '') : '';

  useEffect(() => {
    if (shouldReduceMotion || numericValue === null) {
      setDisplayed(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (numericValue * eased).toFixed(
              numericValue % 1 !== 0 ? 2 : 0
            );
            setDisplayed(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplayed(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, numericValue, prefix, suffix, shouldReduceMotion]);

  return (
    <div
      ref={ref}
      style={{ textAlign: 'center', padding: '0 16px' }}
      aria-label={ariaLabel || `${label}: ${value}`}
    >
      <div className="metric-number">{shouldReduceMotion ? value : displayed}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
