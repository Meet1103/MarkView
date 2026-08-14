import { useState } from 'react';
import { Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Preview toolbar displaying the current file and document actions.
 */
export function Toolbar({
  fileName,
  fileContent,
  previewRef,
  isLoading,
  error,
  isSummarizing,
  onSummarize,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!fileContent) return;

    try {
      const html = previewRef?.current?.innerHTML ?? fileContent;
      const plainText = previewRef?.current?.innerText ?? fileContent;

      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        const items = {
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([plainText], { type: 'text/plain' }),
        };

        if (
          !ClipboardItem.supports ||
          ClipboardItem.supports('text/markdown')
        ) {
          items['text/markdown'] = new Blob(
            [fileContent],
            { type: 'text/markdown' }
          );
        }

        await navigator.clipboard.write([
          new ClipboardItem(items),
        ]);
      } else {
        await navigator.clipboard.writeText(fileContent);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const isSummarizeDisabled = !fileContent || isLoading || !!error || isSummarizing;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 sm:px-6 bg-card border-b border-border rounded-t-2xl">
      <div className="text-sm font-medium text-muted-foreground truncate max-w-[240px] sm:max-w-[400px]">
        {fileName || 'No file loaded'}
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={onSummarize}
          disabled={isSummarizeDisabled}
          aria-label="Summarize document"
          aria-busy={isSummarizing}
          className="h-8 px-3.5 text-xs font-medium gap-2 border-primary/30 bg-primary/10 text-indigo-300 cursor-pointer hover:bg-primary/20 hover:text-white hover:border-primary/50 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          {isSummarizing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              <span>Summarizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Summarize</span>
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!fileContent || isLoading || !!error}
          aria-label="Copy document content"
          className="h-8 px-3.5 text-xs font-medium gap-2 border-border bg-secondary text-foreground cursor-pointer hover:bg-secondary/80 hover:border-primary/50 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-primary" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

