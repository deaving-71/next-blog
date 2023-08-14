"use client";

import { Button } from "@/components/ui/button";
import { SidebarList, SidebarListIcon } from "./sidebar-list";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";

export default function Sidebar() {
  const [collapse, setCollapse] = useState<boolean>(false);

  const toggleSidebar = () => setCollapse((prev) => !prev);

  return (
    <aside
      className={cn(
        "border-r bg-woodsmoke-950 border-r-port-gore-600 pt-8 px-4 sticky top-0 bottom-0 overflow-auto h-screen",
        collapse ? "w-[70px]" : "w-[220px]"
      )}
    >
      <div className={cn(!collapse && "flex justify-end")}>
        <Button
          type="button"
          onClick={toggleSidebar}
          className={cn(
            "p-2 hover:bg-woodsmoke-900 rounded-lg transition-[background-color] bg-transparent",
            !collapse && "rotate-180"
          )}
        >
          <BiArrowFromLeft size={22} fill="white" />
        </Button>
      </div>
      {collapse ? <SidebarListIcon /> : <SidebarList />}
    </aside>
  );
}
