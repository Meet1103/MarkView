import { Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * SummaryBanner component
 * Displays the AI-generated 3-5 bullet point summary, loading skeleton, or error state.
 * Rendered at the top of the preview panel above the original Markdown content.
 */
export function SummaryBanner({
  summary,
  isSummarizing,
  error,
  onRetry,
}) {
  if (!isSummarizing && !summary && !error) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="p-4 sm:p-6 border-b border-border bg-gradient-to-b from-primary/10 via-primary/5 to-transparent transition-all duration-200"
    >
      {isSummarizing ? (
        <div aria-busy="true" className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Generating Summary...</span>
          </div>

          <div className="space-y-2.5 pt-1 pl-1">
            <Skeleton className="h-4 w-11/12 rounded-md bg-primary/15 animate-pulse" />
            <Skeleton className="h-4 w-4/5 rounded-md bg-primary/15 animate-pulse" />
            <Skeleton className="h-4 w-9/12 rounded-md bg-primary/15 animate-pulse" />
            <Skeleton className="h-4 w-3/4 rounded-md bg-primary/15 animate-pulse" />
          </div>
        </div>
      ) : error ? (
        <div role="alert" className="p-4 rounded-xl border border-destructive/30 bg-destructive/10 space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">
                Unable to generate summary
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {error || 'Something went wrong. Please try again.'}
              </p>
            </div>
          </div>

          <div className="pt-1 flex justify-start">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="h-8 px-3 text-xs font-medium gap-1.5 border-destructive/40 bg-card hover:bg-destructive/10 hover:text-foreground hover:border-destructive/60 rounded-lg cursor-pointer transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      ) : summary && summary.length > 0 ? (
        <div className="p-4 sm:p-5 rounded-xl border border-primary/25 bg-card/80 backdrop-blur-xs shadow-xs space-y-3.5">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm sm:text-base tracking-tight">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <h3>Summary</h3>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-foreground/90 leading-relaxed pl-1">
            {summary.map((bullet, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" aria-hidden="true" />
                <span className="break-words flex-1">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
