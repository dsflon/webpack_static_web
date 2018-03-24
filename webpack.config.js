const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = process.argv.indexOf("production") !== -1 ? 'production' : 'development';
if( process.argv.indexOf("--watch") !== -1 ) mode = 'development';

let isDev = (mode === 'development');

/***************************************
** Root path name
***************************************/
const ROOT_PATH_NAME = 'htdocs';

/***************************************
** SCSS Setting
***************************************/
const SCSS_BUILD_PATH = 'common/css';
const SCSS_ENTRY = {
    'style': './' + ROOT_PATH_NAME + '/common/src/scss/style.scss'
}

/***************************************
** JS Setting
***************************************/
const JS_BUILD_PATH = 'common/js';
const JS_ENTRY = {
    // 'file name': 'file path'
    'main': './' + ROOT_PATH_NAME + '/common/src/js/main.js',
    // ディレクトリを追加する場合は相対パスを挿入 、'../' でパスを遡れる、'output file path / file name': 'file path'
    'sub/sub': './' + ROOT_PATH_NAME + '/common/src/js/sub.js'
}

/***************************************
** browser-sync Setting
***************************************/
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


/***************************************
** Webpack Config
***************************************/
module.exports = [
    {

        // メインのJS
        entry: JS_ENTRY,

        // 出力ファイル
        output: {
            //  出力ファイルのディレクトリ名
            path: `${__dirname}/${ROOT_PATH_NAME}/${JS_BUILD_PATH}`,
            // publicPath: `/${JS_BUILD_PATH}/`,
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }
                    ],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.js'],
        },
        devtool: (isDev ? 'source-map' : '')
    },
    {

        entry: SCSS_ENTRY,
        output: {
            path: `${__dirname}/${ROOT_PATH_NAME}/${SCSS_BUILD_PATH}`,
            filename: '[name].css',
        },
        module: {
            rules: [
                {
                    test: /\.(s)css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // CSSをバンドルするための機能
                        {
                            loader: 'css-loader',
                            options: {
                                // オプションでCSS内のurl()メソッドを取り込む
                                // url: true,
                                // ソースマップの利用有無
                                sourceMap: isDev,
                                // 0 => no loaders (default);
                                // 1 => postcss-loader;
                                // 2 => postcss-loader, sass-loader
                                importLoaders: 2,
                                minimize: false
                            }
                        },
                        // autoprefixer を利用するために postcss を利用
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: isDev }
                        },
                        // Sassをバンドルするための機能
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: isDev }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.scss'],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './[name].css',
                chunkFilename: './[id].css'
            }),
            new BrowserSyncPlugin(BROWSER_SYNC)
        ],
        devtool: (isDev ? 'source-map' : '')
    }
]

console.log("-------------------------------------------------------");
console.log("mode: " + mode);
console.log("-------------------------------------------------------");
