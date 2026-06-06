'use client';

import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterProps {
  options: string[];
  typingSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({ options, typingSpeed = 50, pauseDuration = 2500 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [optionIndex, setOptionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(options[0]);
      return;
    }

    const currentOption = options[optionIndex];

    if (isTyping) {
      if (displayed.length < currentOption.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentOption.slice(0, displayed.length + 1));
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, typingSpeed / 2);
      } else {
        setOptionIndex((prev) => (prev + 1) % options.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, isTyping, optionIndex, options, typingSpeed, pauseDuration, shouldReduceMotion]);

  return (
    <span
      style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: 'var(--text-body-lg)',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}
      aria-label={options[0]}
      aria-live="off"
    >
      {displayed}
      {!shouldReduceMotion && (
        <span className="typewriter-cursor" aria-hidden="true" />
      )}
    </span>
  );
}
