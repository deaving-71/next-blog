type Props = {
  status?: "Published" | "Draft";
};

export default function Status({ status }: Props) {
  switch (status) {
    case "Published":
      return <span className="font-medium text-green-500">Published</span>;

    case "Draft":
      return <span className="font-medium text-red-500">Draft</span>;

    default:
      return <span className="font-medium">Unsaved</span>;
  }
}
