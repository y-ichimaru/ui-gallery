# 定義ファイル生成対象の.vueファイルを取得
$vueFilePaths = Get-ChildItem . -Recurse -Include *.vue

# .vueファイルからscriptタグ内のみを抽出し、.tsファイルを生成
$tsFilePaths = @()
$vueFilePaths | ForEach-Object {
    $content = Get-Content $_.FullName
    # scriptタグの開始位置、終了位置
    $startLine = ($content | Select-String -Pattern '<script').LineNumber
    $endLine = ($content | Select-String -Pattern '</script>').LineNumber
    # .tsファイルを生成
    $vueFileDir = Split-Path $_.FullName
    $tsFileName = $_.Name -replace '\.vue', '.ts'
    $tsFilePath = "${vueFileDir}\${tsFileName}"
    $contentScript = $content[$startLine..($endLine - 2)]
    $contentScript | Out-File "${tsFilePath}" -Encoding utf8

    $tsFilePaths += $tsFilePath
}

# 型定義ファイルを生成
yarn tsc --emitDeclarationOnly --declaration -P tsconfig.json
# .tsファイルを削除
$tsFilePaths | Remove-Item