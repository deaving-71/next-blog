import { type Editor } from "@tiptap/react";
import { useCallback } from "react";

const useToolbar = (editor: Editor) => {
  const baseCommand = editor.chain().focus();
  const baseCanCommand = editor.can().chain().focus();

  const Bold = {
    toggler: () => baseCommand.toggleBold().run(),
    disabled: !baseCanCommand.toggleBold().run(),
  };

  const Underline = {
    toggler: () => baseCommand.toggleUnderline().run(),
    disabled: !baseCanCommand.toggleUnderline().run(),
  };

  const Italic = {
    toggler: () => baseCommand.toggleItalic().run(),
    disabled: !baseCanCommand.toggleItalic().run(),
  };

  const Strike = {
    toggler: () => baseCommand.toggleStrike().run(),
    disabled: !baseCanCommand.toggleStrike().run(),
  };

  const OrderedList = {
    toggler: () => baseCommand.toggleOrderedList().run(),
    isActive: editor.isActive("orderedList"),
  };

  const UnorderedList = {
    toggler: () => baseCommand.toggleBulletList().run(),
    isActive: editor.isActive("bulletList"),
  };

  const Subscript = {
    toggler: () => baseCommand.toggleSubscript().run(),
    isActive: editor.isActive("subscript"),
  };

  const Superscript = {
    toggler: () => baseCommand.toggleSuperscript().run(),
    isActive: editor.isActive("superscript"),
  };

  const AlignLeft = {
    toggler: () => baseCommand.setTextAlign("left").run(),
  };

  const AlignCenter = {
    toggler: () => baseCommand.setTextAlign("center").run(),
  };

  const AlignRight = {
    toggler: () => baseCommand.setTextAlign("right").run(),
  };

  const Code = {
    toggler: () => baseCommand.toggleCode().run(),
    isActive: editor.isActive("code"),
  };

  const CodeBlock = {
    toggler: () => baseCommand.toggleCodeBlock().run(),
    isActive: editor.isActive("codeBlock"),
  };

  const TextColor = {
    unsetter: () => baseCommand.unsetColor().run(),
    setter: (color: string) => baseCommand.setColor(`#${color}`).run(),
    isActive: editor.isActive("textStyle"),
  };

  const TextHighlight = {
    unsetter: () => baseCommand.unsetHighlight().run(),
    setter: (color: string) =>
      baseCommand.setHighlight({ color: `#${color}` }).run(),
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
