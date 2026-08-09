'use client';

import React, { useState } from 'react';
import { validateMarkdownFile } from '@/lib/fileValidation';
import { readMarkdownFile } from '@/lib/fileReader';
import { Header } from '@/components/Header';
import { UploadZone } from '@/components/UploadZone';
import { PreviewPanel } from '@/components/PreviewPanel';

/**
 * Home Component (Main Page)
 * 
 * Serves as the central state container and coordinator for the Markdown Viewer app.
 * Responsible ONLY for:
 * 1. Managing application state (fileData, isLoading, error).
 * 2. Orchestrating file validation and asynchronous reading.
 * 3. Composing top-level layout components (Header, UploadZone, PreviewPanel).
 */
export default function Home() {
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Callback function to handle file selection and initiate processing.
   * 
   * This function orchestrates the file processing pipeline:
   * 1. Validates the file using `validateMarkdownFile`.
   * 2. Reads the file content using `readMarkdownFile`.
   * 3. Updates the component state with the file data.
   * 
   * @param {File} file - The Markdown file to process.
   */
  const handleFileSelect = async (file) => {
    setError(null);
    setFileData(null);

    const validation = validateMarkdownFile(file);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsLoading(true);

    try {
      const content = await readMarkdownFile(file);
      setFileData({
        name: file.name,
        size: file.size,
        content: content,
      });
    } catch (err) {
      setError(err?.message || 'Failed to read the Markdown file. Please try again.');
      setFileData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFileData(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <section className="w-full">
          <UploadZone
            onFileSelect={handleFileSelect}
            disabled={isLoading}
          />
        </section>

        <section className="w-full">
          <PreviewPanel
            fileData={fileData}
            isLoading={isLoading}
            error={error}
            onReset={handleRemoveFile}
          />
        </section>
      </main>
    </div>
  );
}
