type Props = {
  error?: string;
};

export default function InputError({ error }: Props) {
  return (
    <div className="font-medium text-sm text-red-500 mb-2">{error ?? ""}</div>
  );
}
