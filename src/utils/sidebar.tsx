import type { Sidebar } from "@/types/Sidebar";
import { Home, DocAdd, Box } from "@icon-park/react";

export const sidebar: Sidebar = [
  {
    category: "Discover",
    items: [
      {
        icon: <Home theme="outline" size="20" fill="#e4e4e7" />,
        title: "Dashboard",
        href: "#",
      },
    ],
  },
  {
    category: "Blogs",
    items: [
      {
        icon: <Box theme="outline" size="20" fill="#e4e4e7" />,
        title: "View Articles",
        href: "/admin/view-articles",
      },
      {
        icon: <DocAdd theme="outline" size="20" fill="#e4e4e7" />,
        title: "Add Article",
        href: "/admin/manage-article",
      },
    ],
  },
];
