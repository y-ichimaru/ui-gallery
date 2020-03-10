using System.Text.RegularExpressions;
using System.Linq;

await Main();

// Main
async Task Main()
{
    var srcFile = "src/index.ts";
    var paths = await ParseVueFile(Directory.EnumerateFiles(@"./src", "*.vue", SearchOption.AllDirectories));
    var tsPaths = Directory.EnumerateFiles(@"./src", "*.ts", SearchOption.AllDirectories);
    try
    {
        TsDocs("");
        TsCompile(srcFile);
    }
    catch (Exception ex)
    {
        Print(ex);
    }
    finally
    {
        await RemoveFiles(paths);
    }
}

async Task<string[]> ParseVueFile(IEnumerable<string> files)
{
    return await Task.WhenAll(files.Select(async item =>
        await Task.Run(async () =>
        {
            // .vueファイルの<script>内を.tsで保存
            var savePath = item.Replace(".vue", ".vue.ts");

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
        })
    ));
}

// TypeScriptコンパイル

void TsCompile(string srcFile)
{
    var process = Process.Start("cmd", "/c yarn tsc " + srcFile + " --emitDeclarationOnly -t ES5 --declaration --experimentalDecorators --outDir build/types");
    process.WaitForExit();
}

void TsDocs(string srcFile)
{
    var process = Process.Start("cmd", "/c yarn typedoc --mode modules --excludeNotExported --out docs/docs " + srcFile);
    process.WaitForExit();
}

async Task RemoveFiles(IEnumerable<string> paths)
{
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
}

async Task Replace(IEnumerable<string> files, string replaceFrom, string replaceTo)
{
    await Task.WhenAll(files.Select(async path =>
    {
        string text = "";
        using (var reader = new StreamReader(path))
        {
            text = await reader.ReadToEndAsync();
        }
        using (var writer = new StreamWriter(path))
        {
            await writer.WriteAsync(text.Replace(replaceFrom, replaceTo));
        }
    }));
}
