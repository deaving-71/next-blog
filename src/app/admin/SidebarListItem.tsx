import { SidebarListCategory } from "@/types/Sidebar";
import Link from "next/link";

type Props = {
  data: SidebarListCategory;
};

export default function SidebarListItem({ data }: Props) {
  return (
    <div className="pb-6">
      <h2 className="font-semibold text-lg py-1">{data.category}</h2>
      <ul>
        {data.items.map(({ icon, title, href }, idx) => (
          <li key={idx}>
            <Link
              href={href}
              className="p-2 mb-1 block hover:bg-woodsmoke-900 rounded-lg transition-all"
            >
              <div className="flex items-center">
                <div className="mr-2">{icon}</div>
                <div className="font-medium text-sm">{title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
