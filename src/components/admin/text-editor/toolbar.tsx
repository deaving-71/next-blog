import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  CodeBlock,
  Image,
  Italic,
  Link,
  OrderedList,
  Strike,
  Subscript,
  Superscript,
  Underline,
  UnorderedList,
} from "@/lib/icons";
import { type Editor } from "@tiptap/react";
import { Button } from "@/components/button";
import { HightlightText, TextColorPicker } from "./color-picker";
import useToolbar from "@/hooks/useToolbar";
import { Divider } from "@/components/ui/divider";

type Props = { editor: Editor };

export default function Toolbar({ editor }: Props) {
  const Tool = useToolbar(editor);

  return (
    <div className="w-full flex items-center gap-2 p-2 bg-[#12141b]">
      <TextColorPicker Tool={Tool.TextColor} />
      <HightlightText Tool={Tool.TextHighlight} />
      <Divider />
      <Button onClick={Tool.Bold.toggler} disabled={Tool.Bold.disabled}>
        <Bold size={16} fill="white" />
      </Button>
      <Button onClick={Tool.Italic.toggler} disabled={Tool.Italic.disabled}>
        <Italic size={16} fill="white" />
      </Button>
      <Button
        onClick={Tool.Underline.toggler}
        disabled={Tool.Underline.disabled}
      >
        <Underline size={16} fill="white" />
      </Button>
      <Button onClick={Tool.Strike.toggler} disabled={Tool.Strike.disabled}>
        <Strike size={16} fill="white" />
      </Button>
      <Button onClick={Tool.Subscript.toggler}>
        <Subscript size={16} fill="white" />
      </Button>
      <Button onClick={Tool.Superscript.toggler}>
        <Superscript size={16} fill="white" />
      </Button>
      <Divider />
      <Button onClick={Tool.AlignLeft.toggler}>
        <AlignLeft size={16} fill="white" />
      </Button>
      <Button onClick={Tool.AlignCenter.toggler}>
        <AlignCenter size={16} fill="white" />
      </Button>
      <Button onClick={Tool.AlignRight.toggler}>
        <AlignRight size={16} fill="white" />
      </Button>
      <Divider />
      <Button onClick={Tool.OrderedList.toggler}>
        <OrderedList size={16} fill="white" />
      </Button>
      <Button onClick={Tool.UnorderedList.toggler}>
        <UnorderedList size={16} fill="white" />
      </Button>
      <Divider />
      <Button onClick={Tool.Code.toggler}>
        <Code size={16} fill="white" />
      </Button>
      <Button onClick={Tool.CodeBlock.toggler}>
        <CodeBlock size={16} fill="white" />
      </Button>
      <Divider />
      <Button onClick={Tool.Image.setter}>
        <Image size={16} fill="white" />
      </Button>
      <Button onClick={Tool.Link.setter}>
        <Link size={16} fill="white" />
      </Button>
    </div>
  );
}
