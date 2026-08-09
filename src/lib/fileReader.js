/**
 * Reads the content of a Markdown file asynchronously.
 * Uses FileReader API to read the file content as text.
 */
export async function readMarkdownFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided for reading.'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        resolve(event.target.result);
      } else {
        reject(new Error('Failed to read file content as text.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Unable to read the selected file. Please try again.'));
    };

    reader.onabort = () => {
      reject(new Error('File reading was aborted.'));
    };

    reader.readAsText(file);
  });
}
