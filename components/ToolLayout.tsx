"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回首页
      </Link>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {title}
        </h1>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>

      {/* Ad banner placeholder */}
      <div className="ad-placeholder mb-8">
        广告位 — 上线后替换为 Google AdSense
      </div>

      {/* Tool content */}
      <div className="card">{children}</div>
    </div>
  );
}
