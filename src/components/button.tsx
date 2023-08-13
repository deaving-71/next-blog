import { cn } from "@/lib/utils";

const Button: React.FC<React.ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      className={cn("p-2 rounded-md hover:bg-[#1d212e]", props.className)}
      type="button"
    ></button>
  );
};

export { Button };
