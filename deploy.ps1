# PowerShell script voor deployment
Write-Host "Starting deployment process..." -ForegroundColor Green

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status --porcelain

# Add all changes
Write-Host "Adding changes to git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
git commit -m "Add Vercel configuration and update deployment"

# Push to origin
Write-Host "Pushing to origin..." -ForegroundColor Yellow
git push origin main

Write-Host "Deployment script completed!" -ForegroundColor Green 