# Testa a API localmente: POST /alunos e GET /alunos
param(
  [string]$BaseUrl = 'http://localhost:3000'
)

Write-Host "Testando API em $BaseUrl"

$payload = @{ 
  nome = "Aluno Teste Script"
  email = "teste.script+$(Get-Date -Format s)@example.com"
  senha = "senha123"
  telefone = "11999999999"
  data_nascimento = "2000-01-01"
} | ConvertTo-Json

try {
  $resp = Invoke-RestMethod -Uri "$BaseUrl/alunos" -Method POST -Body $payload -ContentType 'application/json' -TimeoutSec 10
  Write-Host "POST /alunos -> Sucesso:" -ForegroundColor Green
  $resp | ConvertTo-Json
} catch {
  Write-Host "POST /alunos -> Erro:" -ForegroundColor Red
  if ($_.Exception.Response) { try { $_.Exception.Response.Content.ReadAsStringAsync().Result } catch { $_.Exception.Message } } else { $_.Exception.Message }
  exit 1
}

try {
  $list = Invoke-RestMethod -Uri "$BaseUrl/alunos" -Method GET -TimeoutSec 10
  Write-Host "GET /alunos -> Sucesso. Total de registros retornados: $($list.Length)" -ForegroundColor Green
} catch {
  Write-Host "GET /alunos -> Erro:" -ForegroundColor Red
  Write-Host $_.Exception.Message
  exit 1
}

Write-Host "Teste concluído com sucesso." -ForegroundColor Cyan
