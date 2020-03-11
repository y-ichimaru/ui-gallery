# vue-ui-gallery

##ドキュメント

[UIカタログ](https://scene-live.github.io/ui-gallery/storybook)
[APIリファレンス](https://scene-live.github.io/ui-gallery/docs)

# 自身のプロジェクトにインストールるするには
Githubのリポジトリをそのままnpmパッケージとして利用することができます。
packeage.jsonに下記を追加してyarnを実行するか
```
{
  "ui-gallery": "ssh+git@github.com:scene-live/ui-gallery.git"
}
```
またはクローンしてシンボリックリンクを貼って利用してください
```
$git clone git@github.com:scene-live/ui-gallery.git
$cd ui-gallery
$yarn link
$cd ../path-to-your-project
$yarn link ui-gallery
```

ローカルのGitリポジトリをインストールすることも可能です。インストールしたいプロジェクトのpackage.jsonにリポジトリのパスを指定してyarnを実行してください。
```
{
  "ui-gallery": "../ui-gallery"
}
```

# 開発するには
## Project setup
```
yarn install
```

### 開発サーバー起動
```
yarn storybook
```

### ライブラリのビルド
```
yarn build
```

### 型定義の生成
```
yarn build:type
```
tsc .vueファイルの型定義が生成されないので.vueファイルから.tsファイルを生成して型定義をビルド後削除するスクリプトを実行する必要があります。
スクリプト実行にはdotnetが必要なのでを[こちら](https://dotnet.microsoft.com/download)よりインストールしておいてください。

※ソースはbuild-type.csxを参照

### StoryBookのプロダクションビルド

```
yarn build:story
```

ビルドの出力先は/docsです。このディレクトリがGithub Pagesと連動していて、このディレクトリ配下のファイルを書き換えることで、ページを更新します。


### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint --fix
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
