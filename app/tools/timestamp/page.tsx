"use client";

import { useState, useCallback, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Check, Clock } from "lucide-react";

export default function TimestampPage() {
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState("");
  const [currentTs, setCurrentTs] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [copied, setCopied] = useState(false);

  const updateCurrent = useCallback(() => {
    const now = new Date();
    setCurrentTs(String(Math.floor(now.getTime() / 1000)));
    setCurrentTime(now.toLocaleString("zh-CN"));
  }, []);

  // Init timer
  useEffect(() => {
    updateCurrent();
    const timer = setInterval(updateCurrent, 1000);
    return () => clearInterval(timer);
  }, [updateCurrent]);

  const tsToDate = useCallback(() => {
    const ts = tsInput.trim();
    if (!ts) return;
    let ms: number;
    if (ts.length <= 10) {
      ms = parseInt(ts, 10) * 1000;
    } else {
      ms = parseInt(ts, 10);
    }
    if (isNaN(ms)) {
      setResult("无效的时间戳");
      return;
    }
    const d = new Date(ms);
    setResult(
      `本地时间: ${d.toLocaleString("zh-CN")}\nUTC 时间: ${d.toISOString()}\n毫秒级时间戳: ${d.getTime()}`
    );
  }, [tsInput]);

  const dateToTs = useCallback(() => {
    if (!dateInput) return;
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) {
      setResult("无效的日期时间");
      return;
    }
    setResult(
      `秒级时间戳: ${Math.floor(d.getTime() / 1000)}\n毫秒级时间戳: ${d.getTime()}`
    );
  }, [dateInput]);

  const copyTs = async (val: string) => {
    await navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="时间戳转换"
      description="Unix 时间戳与日期时间互转，自动识别秒/毫秒级时间戳"
    >
      <div className="space-y-6">
        {/* Current Time */}
        <div className="p-4 rounded-lg bg-primary-50 border border-primary-100">
          <div className="flex items-center gap-2 text-sm font-medium text-primary-800 mb-2">
            <Clock className="w-4 h-4" />
            当前时间
          </div>
          <div className="text-lg font-mono text-primary-900">
            {currentTime}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-mono text-primary-700">
              秒级: {currentTs}
            </span>
            <button
              onClick={() => copyTs(currentTs)}
              className="text-primary-500 hover:text-primary-700"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Timestamp to Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            时间戳 → 日期
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              className="tool-input flex-1"
              placeholder="输入时间戳，如 1700000000"
              value={tsInput}
              onChange={(e) => setTsInput(e.target.value)}
            />
            <button onClick={tsToDate} className="tool-btn-primary">
              转换
            </button>
          </div>
        </div>

        {/* Date to Timestamp */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            日期 → 时间戳
          </label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              className="tool-input flex-1"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
            <button onClick={dateToTs} className="tool-btn-primary">
              转换
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              转换结果
            </label>
            <textarea
              className="tool-input h-28 bg-slate-50 font-mono text-sm"
              value={result}
              readOnly
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
