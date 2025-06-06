import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { ChatMessage as ChatMessageType } from '@/types/api';
import { Card } from '@/components/ui/card';
import 'highlight.js/styles/tokyo-night-dark.css'
// import 'highlight.js/styles/stackoverflow-light.css';
// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/github-dark.css';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex w-full ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-[85%] ${
        message.type === 'user'
          // ? 'bg-green-900 text-white'
          ? 'bg-fuchsia-800/20 text-white border-none'
          // : 'bg-white border shadow-sm'
          // : 'bg-fuchsia-100/20 text-white'
          // : 'bg-zinc-800 text-white'
          : 'bg-transparent text-gray-100 border-none'
      }`}>
        {/* <div className="px-3 py-2"> */}
        {/* <div className="flex flex-col gap-2 px-3 py-2"> */}
        {/* <div className="flex flex-col gap-2 px-3 py-1.5"> */}
        {/* <div className="flex flex-col gap-2 px-3 py-0"> */}
        <div className="flex flex-col px-3 py-0">
          {/* Message content */}
          <div className={`prose prose-sm max-w-none ${
            message.type === 'user'
              ? 'prose-invert'
              : 'prose-gray'
          }`}>
            {message.type === 'assistant' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: ({ node, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;

                    if (isInline) {
                      return (
                        <code 
                          className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre
                      // className="p-4 rounded-lg overflow-x-auto text-sm border border-gray-800 shadow">
                      // className="bg-[#1a1b26]/95 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm my-4 shadow">
                      // className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border">
                      // className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm border">
                      className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      {children}
                    </pre>
                  ),
                  p: ({ children }) => (
                    // last:mb-0
                    <p className="leading-normal">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-3 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-3 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-300 pl-4 italic bg-blue-50 py-2 rounded-r">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              <p className="leading-normal">{message.content}</p>
            )}
          </div>

          {/* Sources */}
          {message.links && message.links.length > 0 && (
            <div className="border-t pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-gray-200 -translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-xs font-semibold opacity-75">Sources:</span>
                {/* text-sm font-medium text-gray-700 */}
              </div>
              <div className="grid gap-1">
                {message.links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs underline opacity-75 hover:opacity-100 truncate"
                    title={link}
                  >
                    {link.length > 60 ? `${link.substring(0, 60)}...` : link}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-gray-400">
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
