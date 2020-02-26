using System.Text.RegularExpressions;
using System.Linq;
var files = Directory.EnumerateFiles(@"./src", "*.vue", SearchOption.AllDirectories);

var paths = await Task.WhenAll(files.Select(async item =>
{
    // 並列実行
    return await Task.Run(async () =>
    {
        // .vueファイルの<script>内を.tsで保存
        var savePath = item.Replace(".vue", ".ts");

        using (var writer = new StreamWriter(savePath))
        using (var file = new StreamReader(item))
        {
            var text = await file.ReadToEndAsync();
            // <script></script>の中身を取得 
            var r = new Regex(@"<script\b[^>]*>(.*?)</script>", RegexOptions.IgnoreCase | RegexOptions.Singleline);
            var mc = r.Matches(text);

            foreach (Match m in mc)
            {
                await writer.WriteAsync(m.Groups[1].Value);
            }
        }
        return savePath;
    });
}));

// TypeScriptコンパイル
var process = Process.Start("cmd", "/c yarn tsc --emitDeclarationOnly --declaration -P tsconfig.json");
process.WaitForExit();

// .tsファイルを削除
await Task.WhenAll(
    paths.Select(
        async path => await Task.Run(
            () =>
            {
                File.Delete(path);
            }
        )
    )
);

// import "file.vue"をimport "file" に書き換える
var dstFiles = Directory.EnumerateFiles(@"./build", "*.d.ts", SearchOption.AllDirectories);
await Task.WhenAll(dstFiles.Select(async item =>
{
    // 並列実行
    await Task.Run(async () =>
    {
        string text = "";
        using (var file = new StreamReader(item))
        {
            text = await file.ReadToEndAsync();
            file.Close();
        }
        using (var writer = new StreamWriter(item))
        {
            await writer.WriteAsync(text.Replace(".vue", ""));
        }
    });
}));