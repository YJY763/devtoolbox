import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "DevToolbox - 免费在线开发者工具箱",
    template: "%s | DevToolbox",
  },
  description:
    "免费在线开发者工具集合：JSON格式化、Base64编解码、URL编码解码、时间戳转换、MD5/SHA加密、正则表达式测试等。",
  keywords: [
    "在线工具",
    "JSON格式化",
    "Base64",
    "URL编码",
    "时间戳",
    "MD5",
    "正则表达式",
    "开发者工具",
    "免费",
  ],
  authors: [{ name: "DevToolbox" }],
  openGraph: {
    title: "DevToolbox - 免费在线开发者工具箱",
    description: "免费在线开发者工具集合，提升你的开发效率",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google AdSense - 上线后取消注释 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX" crossOrigin="anonymous"></script> */}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
