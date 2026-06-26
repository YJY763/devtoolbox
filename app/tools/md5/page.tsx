"use client";

import { useState, useCallback, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Copy, Trash2, Check, Upload } from "lucide-react";
import CryptoJS from "crypto-js";

type Algo = "MD5" | "SHA1" | "SHA256" | "SHA512";

export default function HashPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [algo, setAlgo] = useState<Algo>("MD5");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const compute = useCallback(() => {
    if (!input) {
      setOutput("");
      return;
    }
    let hash: string;
    switch (algo) {
      case "MD5":
        hash = CryptoJS.MD5(input).toString();
        break;
      case "SHA1":
        hash = CryptoJS.SHA1(input).toString();
        break;
      case "SHA256":
        hash = CryptoJS.SHA256(input).toString();
        break;
      case "SHA512":
        hash = CryptoJS.SHA512(input).toString();
        break;
    }
    setOutput(hash);
  }, [input, algo]);

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const wordArray = CryptoJS.lib.WordArray.create(
          reader.result as ArrayBuffer
        );
        let hash: string;
        switch (algo) {
          case "MD5":
            hash = CryptoJS.MD5(wordArray).toString();
            break;
          case "SHA1":
            hash = CryptoJS.SHA1(wordArray).toString();
            break;
          case "SHA256":
            hash = CryptoJS.SHA256(wordArray).toString();
            break;
          case "SHA512":
            hash = CryptoJS.SHA512(wordArray).toString();
            break;
        }
        setOutput(`${hash}  (文件: ${file.name})`);
      };
      reader.readAsArrayBuffer(file);
    },
    [algo]
  );

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
      title="哈希计算 (MD5 / SHA)"
      description="在线计算 MD5、SHA1、SHA256、SHA512 哈希值，支持文本和文件"
    >
      <div className="space-y-4">
        {/* Algorithm selector */}
        <div className="flex flex-wrap gap-2">
          {(["MD5", "SHA1", "SHA256", "SHA512"] as Algo[]).map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                algo === a
                  ? "bg-primary-600 text-white border-primary-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            输入文本
          </label>
          <textarea
            className="tool-input h-40"
            placeholder="输入需要计算哈希的文本..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* File input */}
        <div>
          <input
            ref={fileRef}
            type="file"
            onChange={handleFile}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="tool-btn-secondary"
          >
            <Upload className="w-4 h-4" />
            计算文件哈希
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button onClick={compute} className="tool-btn-primary">
            计算 {algo}
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
              {algo} 结果
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
            className="tool-input h-20 bg-slate-50 font-mono text-sm"
            value={output}
            readOnly
            placeholder="哈希结果将显示在这里..."
            spellCheck={false}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
