'use client'
import { Editor } from "novel";
import { useState, useEffect } from "react";

const MyEditor = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const { htmlToProseMirror } = await import("html-to-prosemirror");
      const htmlContent = `<article><h2>Título</h2><p>Este es un párrafo.</p></article>`;
      const jsonContent = htmlToProseMirror(htmlContent);
      setContent(jsonContent);
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    const { prosemirrorToHtml } = await import("html-to-prosemirror");
    const htmlContent = prosemirrorToHtml(content);
    console.log(htmlContent); // Aquí tienes el contenido en HTML
  };

  return (
    <div>
      {content && (
        <Editor
          initialValue={content}
          onChange={(newContent) => setContent(newContent)}
        />
      )}
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default MyEditor;
