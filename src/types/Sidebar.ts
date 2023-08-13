export type SidebarListItem = {
  icon: React.ReactNode;
  href: string;
  title: string;
};

export type SidebarListCategory = {
  category: string;
  items: SidebarListItem[];
};

export type Sidebar = SidebarListCategory[];
