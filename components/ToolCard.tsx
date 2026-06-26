import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link href={tool.href} className="card group block">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
            {tool.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
