import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

/**
 * Loading state skeleton displayed while the Markdown file is being processed.
 */
export function LoadingState() {
  return (
    <div className="p-6 sm:p-10 bg-[var(--card)] rounded-b-2xl space-y-6">
      <div className="flex items-center gap-2.5 text-[var(--muted-foreground)] pb-4 border-b border-[var(--border)]">
        <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
        <span className="text-xs sm:text-sm font-medium text-[var(--foreground)]">Reading Markdown document...</span>
      </div>

      <div className="space-y-4 pt-2">
        <Skeleton className="h-7 w-2/3 rounded-lg bg-[var(--muted)]" />
        <Skeleton className="h-4 w-full rounded-md bg-[var(--muted)]/50" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-[var(--muted)]/50" />
        <Skeleton className="h-4 w-4/5 rounded-md bg-[var(--muted)]/50" />

        <div className="pt-4 space-y-3">
          <Skeleton className="h-5 w-1/3 rounded-md bg-[var(--muted)]/70" />
          <Skeleton className="h-20 w-full rounded-xl bg-[var(--muted)]/40" />
        </div>
      </div>
    </div>
  );
}
