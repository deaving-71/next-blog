import Header from "@/app/admin/Header";
import Sidebar from "@/app/admin/Sidebar";
import Notifications from "@/components/admin/notification/notifications";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Admin",
  description: "Admin dashboard",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Notifications>
      <div className="grid grid-cols-[auto,1fr] text-zinc-200 font-sans">
        <Sidebar />
        <div className="bg-woodsmoke-950 grid grid-rows-[auto,1fr] p-8 min-h-screen h-full overflow-auto">
          <Header />
          {children}
        </div>
      </div>
    </Notifications>
  );
}
