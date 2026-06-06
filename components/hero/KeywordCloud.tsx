'use client';

import { useReducedMotion } from 'framer-motion';

const keywords = [
  'RAG', 'LLM', 'ChromaDB', 'BM25', 'RAGAS', 'React', 'Python',
  'Spring Boot', 'Meta Quest', 'Unity', 'Aspen Plus', 'MATLAB',
  'LangChain', 'Cohere', 'Groq', 'FinBERT', 'NetworkX', 'Simulink',
  'PyVis', 'PageRank', 'Dijkstra', 'UNIQUAC', 'Streamlit', 'Tkinter',
  'FFmpeg', 'OpenXR', 'PostgreSQL', 'Pinch Analysis', 'PID', 'FRED API',
  'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow', 'OpenCV', 'MediaPipe',
];

interface CloudItem {
  word: string;
  left: string;
  top: string;
  duration: string;
  delay: string;
  opacity: number;
}

const cloudItems: CloudItem[] = keywords.map((word, i) => ({
  word,
  left: `${(i * 47 + 13) % 90}%`,
  top: `${(i * 31 + 7) % 85}%`,
  duration: `${18 + (i % 7) * 2}s`,
  delay: `${-(i * 1.5 % 12)}s`,
  opacity: 0.04 + (i % 3) * 0.015,
}));

export function KeywordCloud() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="keyword-cloud"
      aria-hidden="true"
      role="presentation"
    >
      {cloudItems.map((item, i) => (
        <span
          key={i}
          className="keyword-item"
          style={{
            left: item.left,
            top: item.top,
            '--duration': item.duration,
            '--delay': item.delay,
            opacity: item.opacity,
            animationPlayState: shouldReduceMotion ? 'paused' : 'running',
          } as React.CSSProperties}
        >
          {item.word}
        </span>
      ))}
    </div>
  );
}
