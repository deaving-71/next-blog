import { EditorContent, type Editor } from "@tiptap/react";
import Toolbar from "./toolbar";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & { editor: Editor };

export default function TextEditor(props: Props) {
  const { className, editor, ...Props } = props;
  return (
    <div
      {...Props}
      className={cn(
        "border w-[820px] rounded-md mx-auto overflow-hidden",
        className
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="unreset" />
    </div>
  );
}
