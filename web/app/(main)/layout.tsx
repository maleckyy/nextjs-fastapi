
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import TokenWatcher from "@/components/TokenCheck";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col w-full md:flex-row">
        <AppSidebar />
        <div className="w-full p-4">
          <TokenWatcher />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
