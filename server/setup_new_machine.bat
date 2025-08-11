@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   PostgreSQL API Setup Script
echo   For New Machine with Chocolatey
echo ========================================
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator
    echo Please right-click and select "Run as administrator"
    echo.
    pause
    exit /b 1
)

:: Check if Chocolatey is installed
echo Checking Chocolatey installation...
choco --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: Chocolatey is not installed
    echo Please install Chocolatey first by running:
    echo Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    echo.
    pause
    exit /b 1
)

echo SUCCESS: Chocolatey is installed
echo.

:: Install PHP 8.4 with PostgreSQL extensions
echo Installing PHP 8.4...
choco install php --version=8.4.0 -y
if %errorLevel% neq 0 (
    echo ERROR: Failed to install PHP
    pause
    exit /b 1
)

:: Refresh environment variables
echo Refreshing environment variables...
call refreshenv

:: Verify PHP installation
echo Verifying PHP installation...
php --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: PHP installation verification failed
    echo Please restart your terminal and try again
    pause
    exit /b 1
)

echo SUCCESS: PHP installed successfully
php --version | findstr "PHP"
echo.

:: Configure PHP extensions
echo Configuring PHP extensions...
set "PHP_INI_PATH="

:: Try to find php.ini
for /f "tokens=*" %%i in ('php --ini 2^>nul ^| findstr "Loaded Configuration File"') do (
    set "line=%%i"
    set "PHP_INI_PATH=!line:*Loaded Configuration File: =!"
)

if not defined PHP_INI_PATH (
    echo WARNING: Could not find php.ini automatically
    echo Please manually enable pgsql and pdo_pgsql extensions in your php.ini file
    echo.
) else (
    echo Found php.ini at: !PHP_INI_PATH!
    
    :: Create backup
    copy "!PHP_INI_PATH!" "!PHP_INI_PATH!.backup" >nul 2>&1
    echo Created backup: !PHP_INI_PATH!.backup
    
    :: Enable PostgreSQL extensions
    echo Enabling PostgreSQL extensions...
    
    :: Check if extensions are already enabled
    findstr /c:"extension=pgsql" "!PHP_INI_PATH!" >nul 2>&1
    if !errorLevel! neq 0 (
        echo extension=pgsql >> "!PHP_INI_PATH!"
        echo Added: extension=pgsql
    ) else (
        echo extension=pgsql already enabled
    )
    
    findstr /c:"extension=pdo_pgsql" "!PHP_INI_PATH!" >nul 2>&1
    if !errorLevel! neq 0 (
        echo extension=pdo_pgsql >> "!PHP_INI_PATH!"
        echo Added: extension=pdo_pgsql
    ) else (
        echo extension=pdo_pgsql already enabled
    )
    
    echo SUCCESS: PHP extensions configured
    echo.
)

:: Install additional useful tools
echo Installing additional development tools...

:: Install curl (if not already installed)
choco install curl -y >nul 2>&1

:: Install Git (if not already installed)
choco install git -y >nul 2>&1

:: Install Visual Studio Code (optional)
echo.
set /p "install_vscode=Do you want to install Visual Studio Code? (y/n): "
if /i "!install_vscode!"=="y" (
    echo Installing Visual Studio Code...
    choco install vscode -y
    echo SUCCESS: Visual Studio Code installed
) else (
    echo Skipping Visual Studio Code installation
)

echo.

:: Create test script to verify installation
echo Creating verification script...
(
echo @echo off
echo echo ========================================
echo echo   Installation Verification
echo echo ========================================
echo echo.
echo echo Checking PHP installation...
echo php --version
echo echo.
echo echo Checking PostgreSQL extensions...
echo php -r "echo 'pgsql: ' . ^(extension_loaded^('pgsql'^) ? 'ENABLED' : 'DISABLED'^) . PHP_EOL;"
echo php -r "echo 'pdo_pgsql: ' . ^(extension_loaded^('pdo_pgsql'^) ? 'ENABLED' : 'DISABLED'^) . PHP_EOL;"
echo echo.
echo echo If both extensions show ENABLED, you're ready to run the API tests!
echo echo.
echo pause
) > verify_installation.bat

echo SUCCESS: Created verify_installation.bat
echo.

:: Final instructions
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Restart your terminal/command prompt
echo 2. Run: verify_installation.bat
echo 3. If verification passes, run: run_test.bat
echo.
echo If PostgreSQL extensions are not enabled:
echo 1. Find your php.ini file: php --ini
echo 2. Edit the file and uncomment these lines:
echo    extension=pgsql
echo    extension=pdo_pgsql
echo 3. Restart your terminal and verify again
echo.
echo Your PostgreSQL API is ready to use!
echo.

pause 