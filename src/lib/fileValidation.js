/**
 * Maximum allowed file size in bytes (10 MB).
 */
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Formats bytes into human readable format (e.g. 1.2 MB, 450 KB).
 */
export function formatFileSize(bytes) {
  if (bytes === 0 || !bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Validates a selected or dropped file.
 */
export function validateMarkdownFile(file) {
  if (!file) {
    return { isValid: false, error: 'No file provided.' };
  }

  const fileName = file.name || '';
  const isMdExtension = fileName.toLowerCase().endsWith('.md');

  if (!isMdExtension) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload a file with a .md extension.',
    };
  }

  if (file.size === 0) {
    return {
      isValid: false,
      error: 'The selected Markdown file is empty.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the 10 MB limit (${formatFileSize(file.size)}).`,
    };
  }

  return { isValid: true, error: null };
}
