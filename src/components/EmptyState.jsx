import { FileText } from 'lucide-react';

/**
 * Empty state shown when no file has been loaded yet.
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-card rounded-b-2xl min-h-[340px]">
      <div className="w-14 h-14 rounded-2xl bg-secondary border border-border flex items-center justify-center text-primary">
        <FileText className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">
        No document loaded
      </h3>

      <div className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed space-y-1">
        <p className="flex items-center justify-center flex-wrap gap-1">
          <span>Upload a</span>
          <span className="px-1.5 py-0.5 rounded-md bg-primary/20 text-indigo-400 border border-primary/30 font-mono text-xs font-semibold">
            .md
          </span>
          <span>file above to render it here as</span>
        </p>
        <p>GitHub Flavored Markdown.</p>
      </div>
    </div>
  );
}
