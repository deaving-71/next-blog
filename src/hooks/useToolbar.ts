import { type Editor } from "@tiptap/react";
import { useCallback } from "react";

const useToolbar = (editor: Editor) => {
  const Bold = {
    toggler: () => editor.chain().focus().toggleBold().run(),
    disabled: !editor.can().chain().focus().toggleBold().run(),
  };

  const Underline = {
    toggler: () => editor.chain().focus().toggleUnderline().run(),
    disabled: !editor.can().chain().focus().toggleUnderline().run(),
  };

  const Italic = {
    toggler: () => editor.chain().focus().toggleItalic().run(),
    disabled: !editor.can().chain().focus().toggleItalic().run(),
  };

  const Strike = {
    toggler: () => editor.chain().focus().toggleStrike().run(),
    disabled: !editor.can().chain().focus().toggleStrike().run(),
  };

  const OrderedList = {
    toggler: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive("orderedList"),
  };

  const UnorderedList = {
    toggler: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive("bulletList"),
  };

  const Subscript = {
    toggler: () => editor.chain().focus().toggleSubscript().run(),
    isActive: editor.isActive("subscript"),
  };

  const Superscript = {
    toggler: () => editor.chain().focus().toggleSuperscript().run(),
    isActive: editor.isActive("superscript"),
  };

  const AlignLeft = {
    toggler: () => editor.chain().focus().setTextAlign("left").run(),
  };

  const AlignCenter = {
    toggler: () => editor.chain().focus().setTextAlign("center").run(),
  };

  const AlignRight = {
    toggler: () => editor.chain().focus().setTextAlign("right").run(),
  };

  const Code = {
    toggler: () => editor.chain().focus().toggleCode().run(),
    isActive: editor.isActive("code"),
  };

  const CodeBlock = {
    toggler: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor.isActive("codeBlock"),
  };

  const TextColor = {
    unsetter: () => editor.chain().focus().unsetColor().run(),
    setter: (color: string) =>
      editor.chain().focus().setColor(`#${color}`).run(),
    isActive: editor.isActive("textStyle"),
  };

  const TextHighlight = {
    unsetter: () => editor.chain().focus().unsetHighlight().run(),
    setter: (color: string) =>
      editor
        .chain()
        .focus()
        .setHighlight({ color: `#${color}` })
        .run(),
    isActive: editor.isActive("highlight"),
  };

  const Image = {
    setter: useCallback(() => {
      const url = window.prompt("URL");

      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }, [editor]),
    isActive: editor.isActive("image"),
  };

  const Link = {
    setter: useCallback(() => {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }, [editor]),
    isActive: editor.isActive("link"),
  };

  return {
    Bold,
    Italic,
    Strike,
    OrderedList,
    UnorderedList,
    Subscript,
    Superscript,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Underline,
    Image,
    Link,
    Code,
    CodeBlock,
    TextColor,
    TextHighlight,
  };
};

export default useToolbar;
