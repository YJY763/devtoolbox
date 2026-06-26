// Surge.sh 部署脚本 - Node.js 版本
// 用法: node deploy.js

const { spawn } = require("child_process");
const path = require("path");

const SURGE_CMD = path.join("D:", "APP", "node-v24.18.0-win-x64", "surge.cmd");
const OUT_DIR = path.join("D:", "APP", "Claude Code", "history", "toolbox", "out");

console.log("===========================================");
console.log("  DevToolbox 部署到 Surge.sh");
console.log("===========================================");
console.log("");

const child = spawn(SURGE_CMD, [OUT_DIR], {
  stdio: "inherit",
  cwd: OUT_DIR,
  env: { ...process.env, PATH: path.join("D:", "APP", "node-v24.18.0-win-x64") + ";" + process.env.PATH },
});

child.on("close", (code) => {
  console.log(`\n部署完成 (exit ${code})`);
  console.log("按 Ctrl+C 退出");
});
