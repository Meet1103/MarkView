# MarkView

A lightweight, client-side Markdown viewer for previewing `.md` files directly in the browser.

## Features

- Upload a single `.md` file via click or drag & drop
- GitHub Flavored Markdown (GFM)
- Syntax-highlighted code blocks
- Responsive Markdown typography
- Tables, images, nested lists, and task lists
- Lazy-loaded images
- Rich clipboard support with HTML, plain text, and `text/markdown` where supported
- Loading, empty, and error states
- Graceful handling of malformed or incomplete Markdown
- Fully client-side file processing — no uploads or backend required

## Architecture

The app follows a simple component-based flow:

**Upload → Validate → Read → Preview → Render**

`UploadZone` handles file selection, drag & drop, keyboard interaction, and disabled states.

`fileValidation` validates the selected Markdown file, while `fileReader` asynchronously reads its content entirely in the browser.

`PreviewPanel` acts as the central preview container and manages the document UI states:

- **Empty** — no document loaded
- **Loading** — file is being read
- **Error** — validation or file-reading failed
- **Preview** — Markdown content is rendered

`MarkdownRenderer` uses `react-markdown` with `remark-gfm` for GitHub Flavored Markdown and `rehype-highlight` for syntax highlighting. It is lazy-loaded so Markdown rendering dependencies are deferred until a document needs to be rendered.

Custom Markdown components handle application-specific behavior for links, images, tables, task-list checkboxes, and code blocks.

`ErrorBoundary` provides an additional safety layer for unexpected rendering errors.

## Accessibility & UX

- Keyboard-accessible upload interaction
- Visible focus states
- Semantic elements and ARIA labels where appropriate
- Clear disabled states during processing
- Responsive layout across screen sizes
- Horizontal scrolling for wide code blocks and tables
- Clear empty, loading, and error feedback
- External links open safely in a new tab
- Images use lazy loading

## Tech Stack

- Next.js
- React
- JavaScript
- Tailwind CSS
- ShadCN UI
- react-markdown
- remark-gfm
- rehype-highlight
- Highlight.js
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

## Future Improvements

- Add automated tests for Markdown edge cases
- Add optional theme customization
- Add file metadata such as file size and document statistics
