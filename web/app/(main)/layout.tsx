
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { requireAuth } from "@/lib/authCheck";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  requireAuth()
  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className="w-full p-4">
        {children}
      </div>
    </SidebarProvider>
  );
}
