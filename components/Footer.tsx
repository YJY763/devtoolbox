import Link from "next/link";
import { tools } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">在线工具</h3>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={tool.href}
                    className="text-sm text-slate-500 hover:text-primary-600 transition-colors"
                  >
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">关于</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              DevToolbox 是一个免费在线开发者工具箱，所有工具均在浏览器本地运行，数据不会上传到服务器。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">
                  首页
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} DevToolbox. 所有工具免费使用，数据在浏览器本地处理。
        </div>
      </div>
    </footer>
  );
}
