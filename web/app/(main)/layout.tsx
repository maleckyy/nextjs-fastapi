
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GlobalDialogProvider } from "@/store/globalDialogContext/globalDialog";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <GlobalDialogProvider>
          <div className="flex flex-col w-full md:flex-row md:px-4 min-h-0 py-4 px-2">
            <AppSidebar />
            <div className="w-full h-[calc(100vh-2rem)] min-h-0">
              {children}
            </div>
          </div>
        </GlobalDialogProvider>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
