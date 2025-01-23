import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Maximize2, Download } from 'lucide-react';

const BlogSectionRenderer = ({ section }) => {
  const renderSection = () => {
    switch (section.type) {
      case 'title':
        return (
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {section.content}
          </h1>
        );

      case 'subtitle':
        return (
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {section.content}
          </h2>
        );

      case 'subsubtitle':
        return (
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-3">
            {section.content}
          </h3>
        );

      case 'paragraph':
        return (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {section.content}
          </p>
        );

      case 'code':
        return (
          <div className="mb-6 rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language={section.language}
              style={tomorrow}
              className="!bg-gray-800 !p-4"
              showLineNumbers
            >
              {section.content}
            </SyntaxHighlighter>
          </div>
        );

      case 'image':
        return (
          <div className="mb-6">
            <img
              src={section.src}
              alt={section.alt}
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
            />
            {section.caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                {section.caption}
              </p>
            )}
          </div>
        );

      case 'list':
        return (
          <ul className="list-none space-y-3 mb-6">
            {section.items.map((item, index) => {
              const parts = item.split(':');
              if (parts.length > 1) {
                return (
                  <li key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
                    <span className="flex-shrink-0">•</span>
                    <span>
                      <strong className="font-semibold">{parts[0].trim()}: </strong>
                      {parts[1].trim()}
                    </span>
                  </li>
                );
              }
              return (
                <li key={index} className="flex gap-2 text-gray-700 dark:text-gray-300">
                  <span className="flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        );

      case 'listB':
        return (
          <ol className="list-decimal list-inside space-y-3 mb-6">
            {section.items.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ol>
        );

      case 'pdf':
        return (
          <div className="relative w-full h-[600px] mb-6 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={section.src}
              className="w-full h-full border-none"
              title="PDF Viewer"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                  }
                }}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Fullscreen"

              >
                <Maximize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <a
                href={section.srcLoad}
                download
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Download"
              >
                <Download className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm ">
              <thead>
                <tr>
                  {section.columns.map((column, index) => (
                    <th
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-left p-4 border border-gray-200 dark:border-gray-600 "
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="p-4 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        console.warn(`Unknown section type: ${section.type}`);
        return null;
    }
  };

  return <div className="blog-section">{renderSection()}</div>;
};

export default BlogSectionRenderer;