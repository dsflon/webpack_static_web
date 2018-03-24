const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = process.argv.indexOf("production") !== -1 ? 'production' : 'development';
if( process.argv.indexOf("--watch") !== -1 ) mode = 'development';

let isDev = (mode === 'development');
let scssMinimize = (process.env.npm_lifecycle_event !== 'build:dev');

/***************************************
** Root path name
***************************************/
const ROOT_PATH_NAME = 'htdocs';

/***************************************
** SCSS Setting
***************************************/
const SCSS_BUILD_PATH = '/common/css';
const SCSS_ENTRY = {
    'style': './' + ROOT_PATH_NAME + '/common/src/scss/style.scss'
}

/***************************************
** JS Setting
***************************************/
const JS_BUILD_PATH = '/common/js';
const JS_ENTRY = {
    'main': './' + ROOT_PATH_NAME + '/common/src/js/main.js'
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

let pathsToClean = [
    './' + ROOT_PATH_NAME + '/common/src/scss/',
    SCSS_BUILD_PATH
]
let cleanOptions = {
    root:     './' + ROOT_PATH_NAME + '/',
    exclude:  ['no_need_file.js'],
    verbose:  true,
    dry:      false
}

/***************************************
** Webpack Config
***************************************/
module.exports = [
    {

        entry: JS_ENTRY,
        output: {
            path: `${__dirname}/${ROOT_PATH_NAME}${JS_BUILD_PATH}`,
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
        devtool: (isDev ? 'inline-source-map' : '')
    },
    {
        watchOptions : {
            aggregateTimeout: 300
        },
        entry: SCSS_ENTRY,
        output: {
            path: `${__dirname}/${ROOT_PATH_NAME}${SCSS_BUILD_PATH}`,
            filename: 'no_need_file/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // CSSをバンドルするための機能
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: isDev,
                                importLoaders: 2,
                                minimize: scssMinimize
                            }
                        },
                        // autoprefixer を利用するために postcss を利用
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isDev,
                                minimize: scssMinimize
                            }
                        },
                        // Sassをバンドルするための機能
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDev,
                                minimize: scssMinimize
                            }
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
                filename: '[name].css'
            }),
            new BrowserSyncPlugin(BROWSER_SYNC)
        ],
        devtool: (isDev ? 'inline-source-map' : '')
    }
]

console.log("-------------------------------------------------------");
console.log("mode: " + mode);
console.log("-------------------------------------------------------");
