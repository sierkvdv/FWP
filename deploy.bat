@echo off
echo Starting deployment...
git add .
git commit -m "Add Vercel configuration"
git push origin main
echo Deployment completed!
pause 