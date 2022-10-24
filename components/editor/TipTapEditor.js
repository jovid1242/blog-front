import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleClick = () => {};

  return (
    <div className="menus-editor">
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        bold
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        italic
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        strike
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        code
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().unsetAllMarks().run();
        }}
        className="btn-editor-tip"
      >
        clear marks
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().clearNodes().run();
        }}
        className="btn-editor-tip"
      >
        clear nodes
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
        className={
          editor.isActive("paragraph")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        paragraph
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={
          editor.isActive("heading", { level: 1 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h1
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={
          editor.isActive("heading", { level: 2 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h2
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={
          editor.isActive("heading", { level: 3 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h3
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
        className={
          editor.isActive("heading", { level: 4 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h4
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
        className={
          editor.isActive("heading", { level: 5 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h5
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
        className={
          editor.isActive("heading", { level: 6 })
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        h6
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={
          editor.isActive("bulletList")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        bullet list
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={
          editor.isActive("orderedList")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        ordered list
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={
          editor.isActive("codeBlock")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        code block
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={
          editor.isActive("blockquote")
            ? "is-active btn-editor-tip"
            : "btn-editor-tip"
        }
      >
        blockquote
      </button>
      <button
        onClick={(ev) => {
          ev.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
        className="btn-editor-tip"
      >
        horizontal rule
      </button>
    </div>
  );
};

const TipTapEditor = ({ hanldeChange }) => {
  const [content, setcontent] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: `Начни писать сюда!!!`,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setcontent(html);
      // send the content to an API here
    },
  });
  useEffect(() => {
    hanldeChange(content);
  }, [content]);

  return (
    <div>
      <h4>Используйте кнопки для редактирования текста</h4>
      <MenuBar editor={editor} />
      <div className="editor-text-changer">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTapEditor;
