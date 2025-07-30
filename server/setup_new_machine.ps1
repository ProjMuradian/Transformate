# PostgreSQL API Setup Script for New Machine with Chocolatey
# Run this script as Administrator

param(
    [switch]$SkipVSCode,
    [switch]$Force
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PostgreSQL API Setup Script" -ForegroundColor Cyan
Write-Host "  For New Machine with Chocolatey" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as administrator'" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Chocolatey is installed
Write-Host "Checking Chocolatey installation..." -ForegroundColor Yellow
try {
    $chocoVersion = choco --version
    Write-Host "SUCCESS: Chocolatey is installed (version: $chocoVersion)" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Chocolatey is not installed" -ForegroundColor Red
    Write-Host "Please install Chocolatey first by running:" -ForegroundColor Yellow
    Write-Host "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Install PHP 8.4
Write-Host "Installing PHP 8.4..." -ForegroundColor Yellow
try {
    choco install php --version=8.4.0 -y
    if ($LASTEXITCODE -ne 0) {
        throw "Chocolatey installation failed"
    }
    Write-Host "SUCCESS: PHP 8.4 installed" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to install PHP: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Refresh environment variables
Write-Host "Refreshing environment variables..." -ForegroundColor Yellow
refreshenv

# Verify PHP installation
Write-Host "Verifying PHP installation..." -ForegroundColor Yellow
try {
    $phpVersion = php --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $version = ($phpVersion | Select-Object -First 1) -replace "PHP ", ""
        Write-Host "SUCCESS: PHP installed successfully ($version)" -ForegroundColor Green
    } else {
        throw "PHP not found in PATH"
    }
} catch {
    Write-Host "ERROR: PHP installation verification failed" -ForegroundColor Red
    Write-Host "Please restart your terminal and try again" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Configure PHP extensions
Write-Host "Configuring PHP extensions..." -ForegroundColor Yellow

# Find php.ini file
$phpIniPath = $null
try {
    $iniOutput = php --ini 2>$null
    if ($LASTEXITCODE -eq 0) {
        $iniLine = $iniOutput | Where-Object { $_ -match "Loaded Configuration File:" }
        if ($iniLine) {
            $phpIniPath = ($iniLine -split "Loaded Configuration File:")[1].Trim()
        }
    }
} catch {
    Write-Host "WARNING: Could not automatically find php.ini" -ForegroundColor Yellow
}

if (-not $phpIniPath) {
    Write-Host "WARNING: Could not find php.ini automatically" -ForegroundColor Yellow
    Write-Host "Please manually enable pgsql and pdo_pgsql extensions in your php.ini file" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "Found php.ini at: $phpIniPath" -ForegroundColor Cyan
    
    # Create backup
    $backupPath = "$phpIniPath.backup"
    try {
        Copy-Item $phpIniPath $backupPath -Force
        Write-Host "Created backup: $backupPath" -ForegroundColor Green
    } catch {
        Write-Host "WARNING: Could not create backup: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    
    # Read current php.ini content
    $iniContent = Get-Content $phpIniPath -Raw
    
    # Check and enable extensions
    $extensionsToEnable = @("pgsql", "pdo_pgsql")
    $modified = $false
    
    foreach ($ext in $extensionsToEnable) {
        $extensionLine = "extension=$ext"
        
        if ($iniContent -match [regex]::Escape($extensionLine)) {
            Write-Host "extension=$ext already enabled" -ForegroundColor Green
        } elseif ($iniContent -match [regex]::Escape(";$extensionLine")) {
            # Extension is commented out, enable it
            $iniContent = $iniContent -replace ";$extensionLine", $extensionLine
            Write-Host "Enabled: $extensionLine" -ForegroundColor Green
            $modified = $true
        } else {
            # Extension not found, add it
            $iniContent += "`n$extensionLine"
            Write-Host "Added: $extensionLine" -ForegroundColor Green
            $modified = $true
        }
    }
    
    # Save changes if modified
    if ($modified) {
        try {
            Set-Content $phpIniPath $iniContent -Force
            Write-Host "SUCCESS: PHP extensions configured" -ForegroundColor Green
        } catch {
            Write-Host "ERROR: Could not save php.ini changes: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host ""
}

# Install additional development tools
Write-Host "Installing additional development tools..." -ForegroundColor Yellow

# Install curl
try {
    choco install curl -y >$null 2>&1
    Write-Host "SUCCESS: curl installed/verified" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Could not install curl: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Install Git
try {
    choco install git -y >$null 2>&1
    Write-Host "SUCCESS: Git installed/verified" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Could not install Git: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Install Visual Studio Code (optional)
if (-not $SkipVSCode) {
    Write-Host ""
    $installVSCode = Read-Host "Do you want to install Visual Studio Code? (y/n)"
    if ($installVSCode -eq 'y' -or $installVSCode -eq 'Y') {
        Write-Host "Installing Visual Studio Code..." -ForegroundColor Yellow
        try {
            choco install vscode -y
            Write-Host "SUCCESS: Visual Studio Code installed" -ForegroundColor Green
        } catch {
            Write-Host "WARNING: Could not install Visual Studio Code: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Skipping Visual Studio Code installation" -ForegroundColor Cyan
    }
}

Write-Host ""

# Create verification script
Write-Host "Creating verification script..." -ForegroundColor Yellow
$verifyScript = @"
@echo off
echo ========================================
echo   Installation Verification
echo ========================================
echo.
echo Checking PHP installation...
php --version
echo.
echo Checking PostgreSQL extensions...
php -r "echo 'pgsql: ' . (extension_loaded('pgsql') ? 'ENABLED' : 'DISABLED') . PHP_EOL;"
php -r "echo 'pdo_pgsql: ' . (extension_loaded('pdo_pgsql') ? 'ENABLED' : 'DISABLED') . PHP_EOL;"
echo.
echo If both extensions show ENABLED, you're ready to run the API tests!
echo.
pause
"@

try {
    Set-Content "verify_installation.bat" $verifyScript -Encoding ASCII
    Write-Host "SUCCESS: Created verify_installation.bat" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Could not create verification script: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Final instructions
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your terminal/command prompt" -ForegroundColor White
Write-Host "2. Run: verify_installation.bat" -ForegroundColor White
Write-Host "3. If verification passes, run: run_test.bat" -ForegroundColor White
Write-Host ""
Write-Host "If PostgreSQL extensions are not enabled:" -ForegroundColor Yellow
Write-Host "1. Find your php.ini file: php --ini" -ForegroundColor White
Write-Host "2. Edit the file and uncomment these lines:" -ForegroundColor White
Write-Host "   extension=pgsql" -ForegroundColor Cyan
Write-Host "   extension=pdo_pgsql" -ForegroundColor Cyan
Write-Host "3. Restart your terminal and verify again" -ForegroundColor White
Write-Host ""
Write-Host "Your PostgreSQL API is ready to use!" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit" 