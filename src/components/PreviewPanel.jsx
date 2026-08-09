import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { Toolbar } from '@/components/Toolbar';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { ErrorBoundary } from '@/components/ErrorBoundary';

/**
 * Lazy-load Markdown rendering dependencies until a file is uploaded.
 */
const MarkdownRenderer = dynamic(
  () => import('@/components/MarkdownRenderer'),
  {
    loading: () => <LoadingState />,
  }
);

/**
 * Preview panel that composes the toolbar, document states, and Markdown renderer.
 */
export function PreviewPanel({ fileData, isLoading, error, onReset }) {
  const previewRef = useRef(null);
  const fileName = error ? 'Upload error' : fileData?.name;

  return (
    <div className="w-full bg-card rounded-2xl border border-border overflow-hidden shadow-xs transition-all">
      <Toolbar
        fileName={fileName}
        fileContent={fileData?.content}
        previewRef={previewRef}
        isLoading={isLoading}
        error={error}
      />

      <ErrorBoundary onReset={onReset}>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : fileData ? (
          <div ref={previewRef}>
            <MarkdownRenderer content={fileData.content} />
          </div>
        ) : (
          <EmptyState />
        )}
      </ErrorBoundary>
    </div>
  );
}
