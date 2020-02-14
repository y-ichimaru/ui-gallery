# vue-ui-gallery

## Project setup
```
yarn install
```

## DEMO

### StoryBookの開発サーバー起動
```
yarn serve
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

[DEMO](https://scene-live.github.io/ui-gallery/)


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
