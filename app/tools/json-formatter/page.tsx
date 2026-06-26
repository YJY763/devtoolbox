"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Trash2, Minimize2, Check, AlertCircle } from "lucide-react";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const format = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "未知错误";
      setError(`JSON 解析错误: ${msg}`);
      setOutput("");
    }
  }, [input, indent]);

  const compress = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "未知错误";
      setError(`JSON 解析错误: ${msg}`);
      setOutput("");
    }
  }, [input]);

  const validate = useCallback(() => {
    setError("");
    try {
      JSON.parse(input);
      setOutput("✅ JSON 格式正确！");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "未知错误";
      setError(`JSON 无效: ${msg}`);
      setOutput("");
    }
  }, [input]);

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="JSON 格式化 / 验证"
      description="格式化、压缩、验证 JSON 数据，支持自定义缩进"
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={format} className="tool-btn-primary">
            格式化
          </button>
          <button onClick={compress} className="tool-btn-secondary">
            <Minimize2 className="w-4 h-4" />
            压缩
          </button>
          <button onClick={validate} className="tool-btn-secondary">
            <Check className="w-4 h-4" />
            验证
          </button>
          <span className="text-sm text-slate-400 mx-2">缩进:</span>
          {[2, 4, 8].map((n) => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`px-3 py-1 rounded text-sm border transition-colors ${
                indent === n
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {n} 空格
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            输入 JSON
          </label>
          <textarea
            className="tool-input h-48"
            placeholder='{"name": "DevToolbox", "version": 1}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700">
              输出结果
            </label>
            {output && (
              <button
                onClick={copyOutput}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary-600 transition-colors"
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
            )}
          </div>
          {error ? (
            <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : (
            <textarea
              className="tool-input h-48 bg-slate-50"
              value={output}
              readOnly
              placeholder="格式化结果将显示在这里..."
              spellCheck={false}
            />
          )}
        </div>

        {/* Clear */}
        <div className="flex justify-end">
          <button onClick={clear} className="tool-btn-danger">
            <Trash2 className="w-4 h-4" />
            清空
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
