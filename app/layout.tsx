// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// 匯入 Header / Footer
import Header from "./design/layout/Header";
import Footer from "./design/layout/Footer";

// PostHog 相關
import { PHProvider } from './_providers/PostHogProvider'

export const metadata: Metadata = {
  title: "MBRI Compute Demo",
  description: "BVT Environment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen flex flex-col">
        {/* 將所有客戶端邏輯封裝在 PHProvider 內 */}
        <PHProvider>
          
          {/* 🔹 Header */}
          <div className="fixed top-0 left-0 w-full z-50">
            <Header />
          </div>

          {/* 🔹 Main Content */}
          <main className="flex-1 pt-20">
            {children}
          </main>

          {/* 🔹 Footer */}
          <Footer />

        </PHProvider>
      </body>
    </html>
  );
}