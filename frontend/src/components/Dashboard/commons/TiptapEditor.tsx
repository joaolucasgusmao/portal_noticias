import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

const TiptapEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Atualiza o conteúdo do editor só quando o `content` externo mudar de fato (ex: carregou a notícia, resetou o formulário)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="bg-white rounded p-2 border border-gray-300 min-h-[300px]">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
