@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Bu yardımcı için Node.js 22 veya daha yeni bir sürüm gerekir.
  echo Siteyi doğrudan görmek için index.html dosyasını açabilirsiniz.
  pause
  exit /b 1
)
node scripts/configure-site.mjs --prompt
if errorlevel 1 goto :error
node scripts/build-public.mjs
if errorlevel 1 goto :error
node scripts/check.mjs --public
if errorlevel 1 goto :error
echo.
echo Yayına hazır dosyalar _site klasöründedir.
echo _site klasörünün içeriğini hosting web köküne yükleyin.
pause
exit /b 0
:error
echo İşlem tamamlanamadı. Yukarıdaki hatayı kontrol edin.
pause
exit /b 1
