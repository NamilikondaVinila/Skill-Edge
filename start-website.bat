@echo off
title Skill Edge website
cd /d "%~dp0"
where npm >/dev/null 2>/dev/null || (echo Node.js is not installed. Get it from https://nodejs.org and run this again. & pause & exit /b)
if not exist "node_modules" call npm install
if not exist "client\node_modules" call npm install --prefix client
if not exist "server\node_modules" call npm install --prefix server
echo.
echo Starting Skill Edge... the site will open at http://localhost:5173
echo Keep this window open. Close it to stop the website.
start "" cmd /c "timeout /t 6 >/dev/null & start http://localhost:5173"
call npm run dev
pause
