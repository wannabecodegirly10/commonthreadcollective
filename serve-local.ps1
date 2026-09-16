$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 43147
$prefix = "http://127.0.0.1:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".webp" = "image/webp"
  ".ico"  = "image/x-icon"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $root at $prefix"

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $reqPath = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath.TrimStart("/"))
  if ([string]::IsNullOrWhiteSpace($reqPath)) { $reqPath = "index.html" }
  $full = [System.IO.Path]::GetFullPath((Join-Path $root $reqPath))
  if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
    $ctx.Response.StatusCode = 403
    $ctx.Response.Close()
    continue
  }
  if (Test-Path $full -PathType Container) {
    $full = Join-Path $full "index.html"
  }
  if (Test-Path $full -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($full)
    $ext = [System.IO.Path]::GetExtension($full).ToLowerInvariant()
    $ctx.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" })
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.Close()
}
