import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/lib/tools";
import { Sparkles, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "本地运行",
    description: "所有工具均在浏览器本地执行，数据不会上传到任何服务器",
  },
  {
    icon: Shield,
    title: "隐私安全",
    description: "无需注册，无数据收集，你的数据始终在你自己的设备上",
  },
  {
    icon: Globe,
    title: "完全免费",
    description: "所有工具永久免费使用，无需付费订阅",
  },
  {
    icon: Sparkles,
    title: "持续更新",
    description: "不断添加新的实用工具，满足更多开发需求",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          开发者在线工具箱
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          免费、安全、高效的在线开发工具集合。
          JSON 格式化、Base64 编解码、URL 编码、时间戳转换、哈希计算、正则测试……更多工具持续添加中。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                         bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
            >
              <tool.icon className="w-4 h-4" />
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="ad-placeholder">
          顶部广告位 — 上线后替换为 Google AdSense
        </div>
      </div>

      {/* Tool Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
            为什么选择 DevToolbox？
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="text-center">
                <div className="inline-flex w-12 h-12 rounded-xl bg-primary-50 items-center justify-center mb-4">
                  <feat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-500">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          开始使用
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          选择你需要的工具，无需安装，打开即用。所有工具完全免费。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.slice(0, 3).map((tool) => (
            <Link key={tool.slug} href={tool.href} className="tool-btn-primary">
              <tool.icon className="w-4 h-4" />
              {tool.title}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
