Write-Host "`n=== OpenCode Install (via nvm + npm) ===`n"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$nvmZip = Join-Path $scriptDir "nvm-windows.zip"
$nvmDir = "$env:USERPROFILE\nvm-windows"

if (-not (Test-Path "$nvmDir\nvm.exe")) {
    Write-Host "[1/3] Extracting nvm-windows..."
    Expand-Archive -Path $nvmZip -DestinationPath $nvmDir -Force
    
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($currentPath -notlike "*$nvmDir*") {
        [Environment]::SetEnvironmentVariable("PATH", "$nvmDir;$currentPath", "User")
        $env:PATH = "$nvmDir;$env:PATH"
    }
    [Environment]::SetEnvironmentVariable("NVM_HOME", $nvmDir, "User")
    [Environment]::SetEnvironmentVariable("NVM_SYMLINK", "$env:USERPROFILE\AppData\Roaming\nvm", "User")
}

Write-Host "[2/3] Installing Node.js LTS..."
nvm install lts 2>$null
nvm use lts 2>$null

Write-Host "[3/3] Installing OpenCode..."
npm install -g opencode-ai

Write-Host "`nDone! Type 'opencode' in terminal to start`n"
Read-Host "`nPress Enter to exit..."
