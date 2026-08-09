import { AlertCircle } from 'lucide-react';

/**
 * Error state displayed when the Markdown file cannot be read or rendered.
 */
export function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-card rounded-b-2xl min-h-[340px]">
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-foreground tracking-tight mb-1.5">
        Unable to preview file
      </h3>

      <p className="text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
        {message || 'The selected file could not be read or rendered. Please select a valid Markdown file above.'}
      </p>
    </div>
  );
}
