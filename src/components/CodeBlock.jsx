'use client';

/**
 * Code block component for rendering code.
 */
export function CodeBlock({ children }) {
  const className = children?.props?.className ?? '';
  const language = className.match(/language-(\w+)/)?.[1] ?? '';

  return (
    <div
      className="my-4 overflow-hidden rounded-xl border border-[var(--border)] bg-[#19172d]"
      role="region"
      aria-label={language ? `${language} code block` : 'Code block'}
    >
      <div className="border-b border-[var(--border)] bg-black/20 px-4 py-2">
        <span
          className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]"
          aria-label={`Language: ${language || 'plain text'}`}
        >
          {language || 'code'}
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <pre className="!m-0 bg-transparent px-4 py-3 font-mono text-xs leading-relaxed sm:text-sm">
          {children}
        </pre>
      </div>
    </div>
  );
}