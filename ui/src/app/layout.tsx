import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/fwk/context/authProvider";
import SideNav from "@/components/sideNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QBack",
  description: "GTM Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <div className="fixed h-screen z-50" style={{ width: 220 }}>
            <SideNav />
          </div>
          <div style={{ marginLeft: 224 }}>{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
