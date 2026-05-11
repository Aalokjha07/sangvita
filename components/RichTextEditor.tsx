"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = "Enter text...", label }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return <div className="h-64 bg-slate-950 rounded-xl border border-slate-700 animate-pulse"></div>;
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-semibold text-slate-200">{label}</label>}
      <div className="tiptap-editor-wrapper border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
        {/* Toolbar */}
        <div className="toolbar bg-slate-800 border-b border-slate-700 p-2 flex flex-wrap gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`toolbar-btn ${editor.isActive('bold') ? 'active' : ''}`}
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`toolbar-btn ${editor.isActive('italic') ? 'active' : ''}`}
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`toolbar-btn ${editor.isActive('strike') ? 'active' : ''}`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <div className="w-px bg-slate-600 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <div className="w-px bg-slate-600 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`toolbar-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`toolbar-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
            title="Ordered List"
          >
            1.
          </button>
          <div className="w-px bg-slate-600 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`toolbar-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
            title="Blockquote"
          >
            "
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`toolbar-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
            title="Code Block"
          >
            &lt;/&gt;
          </button>
          <div className="w-px bg-slate-600 mx-1"></div>
          <button
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="toolbar-btn"
            title="Clear Formatting"
          >
            ✕
          </button>
        </div>
        
        {/* Editor Content */}
        <EditorContent 
          editor={editor} 
          className="tiptap-editor"
          data-placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
