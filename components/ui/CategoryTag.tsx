interface CategoryTagProps {
  label: string;
  size?: 'sm' | 'md';
}

function getCategoryClass(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('ai') || lower.includes('rag') || lower.includes('llm') || lower.includes('ml') || lower.includes('nlp') || lower.includes('fintech') || lower.includes('hardware')) {
    return 'tag-ai';
  }
  if (lower.includes('xr') || lower.includes('vr') || lower.includes('unity') || lower.includes('game') || lower.includes('full stack') || lower.includes('edtech')) {
    return 'tag-xr';
  }
  if (lower.includes('chemical') || lower.includes('che') || lower.includes('process') || lower.includes('matlab') || lower.includes('control') || lower.includes('numerical') || lower.includes('kinetics') || lower.includes('capstone') || lower.includes('economics') || lower.includes('financial')) {
    return 'tag-che';
  }
  return 'tag-neutral';
}

export function CategoryTag({ label, size = 'sm' }: CategoryTagProps) {
  const categoryClass = getCategoryClass(label);
  const padding = size === 'md' ? '5px 12px' : '4px 10px';

  return (
    <span
      className={categoryClass}
      style={{
        display: 'inline-block',
        borderRadius: '4px',
        padding,
        fontSize: 'var(--text-label)',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
