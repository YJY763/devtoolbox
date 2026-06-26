import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Binary,
  Link2,
  Clock,
  Hash,
  Regex,
} from "lucide-react";

export interface Tool {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    title: "JSON 格式化",
    description: "格式化、压缩、验证 JSON 数据，支持语法高亮和错误提示",
    href: "/tools/json-formatter/",
    icon: Braces,
  },
  {
    slug: "base64",
    title: "Base64 编解码",
    description: "在线 Base64 编码和解码，支持文本与 Base64 互转",
    href: "/tools/base64/",
    icon: Binary,
  },
  {
    slug: "url-encoder",
    title: "URL 编码解码",
    description: "URL Encode / Decode 在线转换，处理特殊字符",
    href: "/tools/url-encoder/",
    icon: Link2,
  },
  {
    slug: "timestamp",
    title: "时间戳转换",
    description: "Unix 时间戳与日期时间互转，支持秒/毫秒自动识别",
    href: "/tools/timestamp/",
    icon: Clock,
  },
  {
    slug: "md5",
    title: "哈希计算",
    description: "MD5 / SHA1 / SHA256 在线加密，支持文件哈希",
    href: "/tools/md5/",
    icon: Hash,
  },
  {
    slug: "regex-tester",
    title: "正则测试",
    description: "在线正则表达式测试工具，实时匹配高亮，支持常用模式",
    href: "/tools/regex-tester/",
    icon: Regex,
  },
];
