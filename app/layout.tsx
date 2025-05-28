import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/sidebar";
import ClientLayout from "./clientLayout";
import { AuthProvider } from "@/lib/auth";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventPass - Event Management System",
  description:
    "Create and manage events, generate passes, and handle check-ins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientLayout>
              <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex flex-1">
                  <AppSidebar />
                  <main className="flex-1 overflow-auto p-6">{children}</main>
                </div>
                <Footer />
              </div>
            </ClientLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
