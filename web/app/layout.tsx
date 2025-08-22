import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/api/queryProvider";
import AuthContextProvider from "@/store/authContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ActiveUserContextProvider from "@/store/activeUserContext";
import HeadMeta from "@/components/HeadMeta";
import { SessionProvider } from "next-auth/react"
import AppInitializer from "@/components/AppInitializer";
import { appMetadata } from "@/seoMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = appMetadata.defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider >
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeadMeta />
            <main className="w-full h-screen">
              <QueryProvider>
                <AuthContextProvider>
                  <ActiveUserContextProvider>
                    <AppInitializer />
                    <Toaster />
                    {children}
                  </ActiveUserContextProvider>
                </AuthContextProvider>
              </QueryProvider>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
