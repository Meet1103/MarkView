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
 * Responsible for:
 * 1. Managing application state (fileData, isLoading, error, summary, isSummarizing, summaryError).
 * 2. Orchestrating file validation and asynchronous reading.
 * 3. Calling the AI summarize endpoint.
 * 4. Composing top-level layout components (Header, UploadZone, PreviewPanel).
 */
export default function Home() {
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Summary feature state
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const resetSummaryState = () => {
    setSummary(null);
    setIsSummarizing(false);
    setSummaryError(null);
  };

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
    resetSummaryState();

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
    resetSummaryState();
  };

  /**
   * This function orchestrates the AI summarization pipeline:
   * 1. Validates the file content for summarization.
   * 2. Calls the AI summarization endpoint.
   * 3. Updates the component state with the summary.
   */
  const handleSummarize = async () => {
    if (!fileData?.content || isSummarizing) return;

    setIsSummarizing(true);
    setSummaryError(null);

    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: fileData.content }),
      });

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Unable to generate summary. Something went wrong. Please try again.');
      }

      setSummary(data.bullets || []);
    } catch (err) {
      setSummaryError(err.message || 'Unable to generate summary. Something went wrong. Please try again.');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        <section className="w-full">
          <UploadZone
            onFileSelect={handleFileSelect}
            disabled={isLoading || isSummarizing}
          />
        </section>

        <section className="w-full">
          <PreviewPanel
            fileData={fileData}
            isLoading={isLoading}
            error={error}
            onReset={handleRemoveFile}
            summary={summary}
            isSummarizing={isSummarizing}
            summaryError={summaryError}
            onSummarize={handleSummarize}
          />
        </section>
      </main>
    </div>
  );
}

