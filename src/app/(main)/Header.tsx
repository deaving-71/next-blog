import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-6 sticky backdrop-blur-sm border-b border-b-woodsmoke-800">
      <Link href="/">Logo</Link>
      <div>
        <input
          type="search"
          className="mr-6 border border-woodsmoke-900 px-4 py-1 outline-none rounded-lg bg-woodsmoke-950 text-zinc-200 placeholder:text-zinc-400 w-[260px] "
          placeholder="Search..."
        />
        <Button
          asChild
          className="bg-white hover:bg-gray-200 text-woodsmoke-950"
        >
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </header>
  );
}
