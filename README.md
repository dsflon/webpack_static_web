# webpack4 を利用した静的webサイト開発環境

静的webサイトを構築するためのwebpackの設定です。

## scss to css
css-loader 及び sass-loader を利用し、scss to css のコンパイルに対応しています。  
また、postcss-loaderを利用しautoprefixer及びcssnanoに対応しています。

autoprefixerの設定は postcss.config.js で変更可能です。

※ css出力に extract-text-webpack-plugin を利用しているが、2018.3 時点では v4.0.0-beta.0 しか動作しない ）


## ECMA script to Native Javascript
babel-loaderを利用し、ECMA scriptに対応しています。

## Web Server
browser-sync 及び browser-sync-webpack-plugin を利用し、ローカルサーバを立ち上げます。  
auto reloadにも対応しています。

----

# webpack.config.js

## Root path setting
ルートパス名を設定します。
```
const ROOT_PATH_NAME = 'public';
```

## SCSS setting
出力先ディレクトリ(SCSS_BUILD_PATH)とソースファイル(SCSS_ENTRY)を設定します。  
SCSS_ENTRYオブジェクトでは、プロパティ名がそのままcssファイル名となります。  
また、プロパティ名を '../style' や 'sample/style' などとすることで出力先ディレクトリを移動させることができます。
```
const SCSS_BUILD_PATH = '/assets/css';
const SCSS_ENTRY = {
    'style': './src/scss/style.scss'
}
const SCSS_SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.
```

## JS setting
出力先ディレクトリ(JS_BUILD_PATH)とソースファイル(JS_ENTRY)を設定します。  
JS_ENTRYオブジェクトでは、プロパティ名がそのままjsファイル名となります。  
また、プロパティ名を '../main' や 'sample/main' などとすることで出力先ディレクトリを移動させることができます。
```
const JS_BUILD_PATH = '/assets/js';
const JS_ENTRY = {
    'main': './src/js/main.js'
}
const JS_SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.
```

## browser-sync setting
BROWSER_SYNCオブジェクトにおいて必要な設定を行います。  
（ webpack-dev-server では静的webサイト構築に必要な機能を得られなかったので browser-sync を利用しています。 ）
```
const BROWSER_SYNC = {
    host: 'localhost',
    port: 3000,
    server: { baseDir: [ROOT_PATH_NAME] },
    files: [
        "**/*.html",
        "**/*.css",
        "**/*.js",
        "!postcss.config.js",
        "!webpack.config.js"
    ],
    open: false
}
```

----

# RUN

## ローカルサーバ起動
css、jsファイルともにsouceMapが有効なった状態で出力されます。  
デフォルトではhtml、css、jsファイルの変更に応じブラウザが auto reload します。
```
$ npm start
```

## 本番用（production）ビルド
css、jsファイルともにsouceMapが無効なった状態で出力されます。
```
$ npm run build
```

## 開発用（development）ビルド
css、jsファイルともにsouceMapが有効なった状態で出力されます。  
また、minimizeが解除されます。
```
$ npm run build:dev
```
