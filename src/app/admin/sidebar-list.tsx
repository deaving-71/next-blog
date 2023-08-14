import { sidebar } from "@/utils/sidebar";
import { SidebarListItem, SidebarListItemIcon } from "./sidebar-list-item";

export function SidebarList() {
  return (
    <nav>
      {sidebar.map((item, idx) => (
        <SidebarListItem key={idx} data={item} />
      ))}
    </nav>
  );
}

export function SidebarListIcon() {
  return (
    <nav>
      <ul>
        {sidebar.map((item, idx) => (
          <SidebarListItemIcon key={idx} data={item} />
        ))}
      </ul>
    </nav>
  );
}
