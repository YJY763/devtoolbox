"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { tools } from "@/lib/tools";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:text-primary-600 transition-colors">
          <Wrench className="w-6 h-6 text-primary-600" />
          <span>DevToolbox</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
            >
              {tool.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="菜单"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
