/***************************************
** Root path name
***************************************/
const ROOT_PATH_NAME = 'public';


/***************************************
** SCSS Setting
***************************************/
const SCSS_BUILD_PATH = '/assets/css';
const SCSS_ENTRY = {
    'style': './src/scss/style.scss'
}
const SCSS_SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.


/***************************************
** JS Setting
***************************************/
const JS_BUILD_PATH = '/assets/js';
const JS_ENTRY = {
    'main': './src/js/main.js'
}
const JS_SOURCE_MAP_STYLE = 'inline-source-map'; // 'inline-source-map', 'source-map', etc.


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
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let mode = process.argv.indexOf("production") !== -1 ? 'production' : 'development';
if( process.argv.indexOf("--watch") !== -1 ) mode = 'development';
let isDev = (mode === 'development');
let scssMinimize = (process.env.npm_lifecycle_event !== 'build:dev');

module.exports = [
    {

        cache: true,
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
        devtool: (isDev ? JS_SOURCE_MAP_STYLE : '')
    },
    {
        cache: true,
        watchOptions : {
            aggregateTimeout: 300
        },
        entry: SCSS_ENTRY,
        output: {
            path: `${__dirname}/${ROOT_PATH_NAME}${SCSS_BUILD_PATH}`,
            filename: '[name].css'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            { // CSSをバンドルするための機能
                                loader: 'css-loader',
                                options: {
                                    sourceMap: isDev,
                                    importLoaders: 2,
                                    minimize: scssMinimize
                                }
                            },
                            { // autoprefixer を利用するために postcss を利用
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: isDev,
                                    minimize: scssMinimize
                                }
                            },
                            { // Sassをバンドルするための機能
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: isDev,
                                    minimize: scssMinimize
                                }
                            }
                        ]
                    })
                }
            ]
        },
        resolve: {
            extensions: ['.scss'],
        },
        plugins: [
            new ExtractTextPlugin('[name].css'),
            new BrowserSyncPlugin(BROWSER_SYNC)
        ],
        devtool: (isDev ? SCSS_SOURCE_MAP_STYLE : '')
    }
]

console.log("-------------------------------------------------------");
console.log("mode: " + mode);
console.log("-------------------------------------------------------");
