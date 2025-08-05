
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
      <div className="flex flex-col w-full md:flex-row p-4 min-h-0">
        <AppSidebar />
        <div className="w-full h-[calc(100vh-2rem)] min-h-0">
          <TokenWatcher />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
