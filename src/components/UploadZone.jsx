import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Upload zone supporting Markdown file selection and drag-and-drop.
 */
export function UploadZone({ onFileSelect, disabled = false }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload Markdown file. Drag and drop a .md file here, or press enter to browse files."
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center w-full py-10 px-6 text-center rounded-2xl border transition-all duration-150 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isDragOver
          ? 'border-primary bg-primary/10'
          : 'border-border hover:border-primary/40 bg-card hover:bg-secondary/50',
        disabled && 'opacity-50 cursor-not-allowed hover:border-border hover:bg-card'
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,text/markdown"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-hidden="true"
      />

      <div className={cn(
        'p-3.5 rounded-xl bg-secondary text-primary border border-primary/30 mb-4 transition-transform duration-150',
        isDragOver && 'scale-105 bg-primary text-primary-foreground'
      )}>
        <Upload className="w-6 h-6" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h2 className="text-base sm:text-lg font-semibold text-foreground tracking-tight flex items-center justify-center flex-wrap gap-1.5">
          <span>Drop your</span>
          <span className="px-2 py-0.5 rounded-md bg-primary/20 text-indigo-400 border border-primary/30 font-mono text-xs font-semibold">
            .md
          </span>
          <span>file here</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          or click to browse — single file, runs entirely in the browser
        </p>
      </div>
    </div>
  );
}
