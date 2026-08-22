@echo off
echo Sincronizando cambios con Lovable...
git add .
git commit -m "update desde antigravity"
echo Descargando cambios antiguos de Lovable (si existen)...
git pull origin main --no-edit
git push
echo Cambios subidos exitosamente!
pause
