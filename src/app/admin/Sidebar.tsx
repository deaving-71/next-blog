"use client";
import { sidebar } from "@/utils/sidebar";
import SidebarListItem from "./SidebarListItem";

export default function Sidebar() {
  return (
    <aside className="border-r w-[220px] bg-woodsmoke-950 border-r-port-gore-600 pt-8 px-4 sticky top-0 bottom-0 overflow-auto h-screen">
      {sidebar.map((item, idx) => (
        <SidebarListItem key={idx} data={item} />
      ))}
    </aside>
  );
}
