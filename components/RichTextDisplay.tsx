"use client";

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay = ({ content, className = "" }: RichTextDisplayProps) => {
  return (
    <div 
      // Removed all "prose" classes. 
      // Added basic HTML tag support using Tailwind's arbitrary selectors
      className={`
        rich-text-content 
        [&_strong]:font-bold [&_em]:italic 
        [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextDisplay;