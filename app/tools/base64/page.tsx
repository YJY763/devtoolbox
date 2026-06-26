"use client";

import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Trash2, ArrowDown, ArrowUp, Check } from "lucide-react";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const encode = useCallback(() => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setOutput("编码失败，请检查输入内容");
    }
  }, [input]);

  const decode = useCallback(() => {
    try {
      setOutput(decodeURIComponent(escape(atob(input.trim()))));
    } catch {
      setOutput("解码失败：请确保输入是有效的 Base64 字符串");
    }
  }, [input]);

  const clear = () => {
    setInput("");
    setOutput("");
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base64 编解码"
      description="在线 Base64 编码和解码，支持中文等 Unicode 字符"
    >
      <div className="space-y-4">
        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`tool-btn ${
              mode === "encode"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ArrowUp className="w-4 h-4" />
            编码 (Encode)
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`tool-btn ${
              mode === "decode"
                ? "bg-primary-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ArrowDown className="w-4 h-4" />
            解码 (Decode)
          </button>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {mode === "encode" ? "输入明文" : "输入 Base64"}
          </label>
          <textarea
            className="tool-input h-40"
            placeholder={
              mode === "encode" ? "输入需要编码的文本..." : "输入 Base64 字符串..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Action */}
        <div className="flex gap-2">
          <button
            onClick={mode === "encode" ? encode : decode}
            className="tool-btn-primary"
          >
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
