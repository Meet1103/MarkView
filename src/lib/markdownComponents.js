'use client';

import React from 'react';
import { CodeBlock } from '@/components/CodeBlock';

/**
 * Functional custom component mappings for react-markdown.
 */
export const markdownComponents = {
  // External links open in a new tab securely
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Responsive images with lazy loading
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      className="max-w-full h-auto rounded-lg mx-auto"
      {...props}
    />
  ),

  // Responsive table wrapper
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table {...props}>{children}</table>
    </div>
  ),

  // GFM task list checkboxes
  input: ({ type, checked, disabled, ...props }) => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled ?? true}
          className="h-4 w-4 rounded-xs border-zinc-700 bg-zinc-800 text-indigo-500 shrink-0 accent-indigo-500 cursor-default"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },

  code: ({ children, ...props }) => {
    return (
      <code
        className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Code blocks
  pre: CodeBlock,
};
