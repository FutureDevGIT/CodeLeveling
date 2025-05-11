@echo off
SETLOCAL

echo Creating virtual environment...
python -m venv env
call env\Scripts\activate

echo Installing requirements...
IF EXIST requirements.txt (
    pip install -r requirements.txt
) ELSE (
    pip install django djangorestframework psycopg2-binary
)

echo Cleaning old migrations...
del /s /q apps\**\migrations\*.py >nul 2>&1
del /s /q apps\**\migrations\__pycache__\* >nul 2>&1

echo Running migrations...
python manage.py makemigrations
python manage.py migrate

echo Creating superuser...
python manage.py createsuperuser

echo Starting development server...
python manage.py runserver

ENDLOCAL
