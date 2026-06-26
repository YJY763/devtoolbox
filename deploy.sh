#!/bin/bash
# ============================================
# DevToolbox 部署脚本
# 用法: bash deploy.sh [选项]
# ============================================

set -e

OUT_DIR="out"

# 检查 Node.js
if ! command -v node &> /dev/null; then
  echo "❌ 未找到 Node.js，请先安装"
  exit 1
fi

# 构建
echo "📦 构建中..."
npm run build
echo "✅ 构建完成 ($OUT_DIR/)"

echo ""
echo "请选择部署方式:"
echo "  1) surge.sh     — 免费，需要邮箱注册 (推荐)"
echo "  2) GitHub Pages — 免费，需要 GitHub 仓库"
echo "  3) 本地预览"
read -p "输入选项 (1/2/3): " choice

case $choice in
  1)
    echo ""
    echo "🚀 部署到 surge.sh..."
    echo "首次使用需输入邮箱和密码（自动注册）"
    npx surge "$OUT_DIR/"
    ;;
  2)
    echo ""
    echo "📋 GitHub Pages 部署说明:"
    echo "   1. 在 GitHub 创建仓库"
    echo "   2. git remote add origin <你的仓库URL>"
    echo "   3. git push -u origin master"
    echo "   4. 去仓库 Settings → Pages → 选择 GitHub Actions"
    echo "   5. 推送后自动部署 ✨"
    ;;
  3)
    echo ""
    echo "🔍 本地预览: http://localhost:8080"
    npx serve "$OUT_DIR" -l 8080
    ;;
  *)
    echo "无效选项"
    ;;
esac
