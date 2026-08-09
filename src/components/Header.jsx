import { FileText } from 'lucide-react';

/**
 * Application header displaying the app branding.
 */
export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
            <FileText className="size-4" aria-hidden="true" />
          </div>

          <span className="text-base font-semibold tracking-tight text-foreground">
            MarkView
          </span>
        </div>
      </div>
    </header>
  );
}

