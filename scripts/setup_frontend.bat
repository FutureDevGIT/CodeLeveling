@echo off
echo ==============================
echo Installing frontend dependencies
echo ==============================
cd codeleveling-frontend

:: Check if node_modules already exists
if exist node_modules (
    echo Dependencies already installed.
) else (
    echo Running npm install...
    call npm install
)

:: Create .env file if not exists
if not exist .env (
    echo Creating .env file...
    echo VITE_API_URL=http://localhost:8000/api> .env
) else (
    echo .env file already exists.
)

echo ==============================
echo Starting the frontend server
echo ==============================
call npm run dev
