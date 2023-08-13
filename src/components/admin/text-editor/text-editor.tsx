import { EditorContent, Editor } from "@tiptap/react";
import Toolbar from "./toolbar";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & { editor: Editor };

export default function TextEditor(props: Props) {
  return (
    <div
      {...props}
      className={cn(
        "border w-[820px] rounded-md mx-auto overflow-hidden",
        props.className
      )}
    >
      <Toolbar editor={props.editor} />
      <EditorContent editor={props.editor} className="unreset" />
    </div>
  );
}
