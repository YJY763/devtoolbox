@echo off
chcp 65001 >nul
title DevToolbox 部署
echo.
echo   ╔══════════════════════════════════════╗
echo   ║     DevToolbox 部署到 Surge.sh      ║
echo   ╚══════════════════════════════════════╝
echo.

set "NODE=D:\APP\node-v24.18.0-win-x64"
set "PATH=%NODE%;%PATH%"

echo   当前目录: D:\APP\Claude Code\history\toolbox\out
echo.

echo   请输入你的邮箱（首次使用会自动注册）:
set /p EMAIL="  Email: "
echo.
echo   请设置密码（输入时不显示）:
set /p PASSWORD="  Password: "

echo.
echo   ⏳ 正在部署...
echo.

:: 部署到 surge
echo %EMAIL%> "%TEMP%\surge_email.txt"
echo %PASSWORD%> "%TEMP%\surge_pass.txt"

type "%TEMP%\surge_email.txt" "%TEMP%\surge_pass.txt" | "%NODE%\surge.cmd" "D:\APP\Claude Code\history\toolbox\out"

del "%TEMP%\surge_email.txt" "%TEMP%\surge_pass.txt" 2>nul

echo.
echo   部署完成！
echo.
pause
