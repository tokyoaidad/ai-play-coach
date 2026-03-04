import type { Metadata } from "next";
import { LayoutShell } from "@/components/LayoutShell";
import { FavoritesProvider } from "@/lib/favorites";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Play Coach | 幼儿亲子陪玩 AI 启蒙",
  description:
    "面向 3–5 岁孩子家长的亲子陪玩玩法卡片，帮助在日常生活中轻松聊 AI 概念。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#FFF8F1] text-slate-800">
        <FavoritesProvider>
          <LayoutShell>{children}</LayoutShell>
        </FavoritesProvider>
      </body>
    </html>
  );
}


