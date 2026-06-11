@echo off
cd /d "%~dp0"
echo.
echo === OpenCode Install (via nvm + npm) ===
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File ".\script\nvm-install.ps1"
echo.
pause
