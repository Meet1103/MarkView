import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { markdownComponents } from '@/lib/markdownComponents';

const REMARK_PLUGINS = [remarkGfm];
const REHYPE_PLUGINS = [rehypeHighlight];

/**
 * Markdown renderer that converts Markdown content into styled HTML.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) {
    return null;
  }

  return (
    <div className="w-full p-6 sm:p-10 bg-[var(--card)] text-[var(--foreground)] rounded-b-2xl">
      <article className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown
          remarkPlugins={REMARK_PLUGINS}
          rehypePlugins={REHYPE_PLUGINS}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
