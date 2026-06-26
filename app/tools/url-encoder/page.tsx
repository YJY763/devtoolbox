"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Trash2, ArrowRightLeft, Check } from "lucide-react";

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    if (mode === "encode") {
      try {
        setOutput(encodeURIComponent(input));
      } catch {
        setOutput("编码失败");
      }
    } else {
      try {
        setOutput(decodeURIComponent(input));
      } catch {
        setOutput("解码失败：请检查 URL 编码格式是否正确");
      }
    }
  }, [input, mode]);

  const clear = () => {
    setInput("");
    setOutput("");
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="URL 编码 / 解码"
      description="URL Encode 和 Decode 在线转换，处理 URL 中的特殊字符"
    >
      <div className="space-y-4">
        {/* Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`tool-btn ${
              mode === "encode"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            URL 编码
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`tool-btn ${
              mode === "decode"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            URL 解码
          </button>
          <button
            onClick={swap}
            className="tool-btn-secondary"
            title="交换输入输出"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {mode === "encode" ? "输入 URL / 文本" : "输入 URL 编码字符串"}
          </label>
          <textarea
            className="tool-input h-40"
            placeholder={
              mode === "encode"
                ? "https://example.com?name=张三&age=18"
                : "https%3A%2F%2Fexample.com%3Fname%3D%E5%BC%A0%E4%B8%89"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={process} className="tool-btn-primary">
            {mode === "encode" ? "编码" : "解码"}
          </button>
          <button onClick={clear} className="tool-btn-danger">
            <Trash2 className="w-4 h-4" />
            清空
          </button>
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
            )}
          </div>
          <textarea
            className="tool-input h-40 bg-slate-50"
            value={output}
            readOnly
            placeholder="结果将显示在这里..."
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
