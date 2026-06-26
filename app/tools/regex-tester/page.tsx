"use client";

import { useState, useCallback, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Trash2, Check } from "lucide-react";

const PRESETS = [
  { label: "邮箱", pattern: "[\\w.-]+@[\\w.-]+\\.\\w+" },
  { label: "手机号", pattern: "1[3-9]\\d{9}" },
  { label: "URL", pattern: "https?://[\\w./-]+" },
  { label: "IP 地址", pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}" },
  { label: "中文", pattern: "[\\u4e00-\\u9fa5]+" },
  { label: "数字", pattern: "\\d+" },
];

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!pattern || !input) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches: string[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((m = regex.exec(input)) !== null) {
          matches.push(m[0]);
          if (m[0] === "") regex.lastIndex++; // avoid infinite loop
        }
      } else {
        m = regex.exec(input);
        if (m) {
          // Show groups
          for (let i = 0; i < m.length; i++) {
            matches.push(`${
              i === 0 ? "完整匹配" : `分组 ${i}`
            }: ${m[i]}`);
          }
        }
      }

      // Highlight matches
      let highlighted = input;
      if (matches.length > 0 && flags.includes("g")) {
        try {
          highlighted = input.replace(
            new RegExp(pattern, flags),
            (match) => `<mark class="bg-yellow-200 rounded px-0.5">${match}</mark>`
          );
        } catch {
          // highlighting failed, use plain text
        }
      }

      return { matches, highlighted, count: matches.length, error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "未知错误";
      return { matches: [], highlighted: input, count: 0, error: msg };
    }
  }, [pattern, flags, input]);

  const clear = () => {
    setPattern("");
    setInput("");
  };

  const copyPattern = async () => {
    await navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="正则表达式测试"
      description="在线正则表达式测试工具，实时匹配高亮，支持常用模式预设"
    >
      <div className="space-y-4">
        {/* Presets */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            常用模式
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setPattern(p.pattern)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700">
              正则表达式
            </label>
            <button
              onClick={copyPattern}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary-600"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" /> 已复制
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> 复制
                </>
              )}
            </button>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 font-mono">
              /
            </span>
            <input
              type="text"
              className="tool-input flex-1"
              placeholder="输入正则表达式，如 \d+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              spellCheck={false}
            />
            <span className="inline-flex items-center px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 font-mono">
              /
            </span>
            <input
              type="text"
              className="w-20 tool-input text-center"
              placeholder="g"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              spellCheck={false}
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            常用标志: g (全局), i (忽略大小写), m (多行), s (点号匹配换行)
          </p>
        </div>

        {/* Test input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            测试文本
          </label>
          <textarea
            className="tool-input h-36"
            placeholder="输入需要测试的文本..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Clear */}
        <div className="flex justify-end">
          <button onClick={clear} className="tool-btn-danger">
            <Trash2 className="w-4 h-4" />
            清空
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            {/* Match count */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">匹配结果:</span>
              {result.error ? (
                <span className="text-sm text-red-600">{result.error}</span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                  {result.count} 处匹配
                </span>
              )}
            </div>

            {/* Highlighted text */}
            {!result.error && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  高亮预览
                </label>
                <div
                  className="tool-input h-28 overflow-auto whitespace-pre-wrap font-mono text-sm"
                  dangerouslySetInnerHTML={{
                    __html:
                      result.highlighted || "没有匹配到任何内容",
                  }}
                />
              </div>
            )}

            {/* Match list */}
            {result.matches.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  匹配列表
                </label>
                <div className="max-h-40 overflow-y-auto rounded-lg border border-slate-200 divide-y divide-slate-100">
                  {result.matches.map((m, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 text-sm font-mono text-slate-700 bg-slate-50"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
