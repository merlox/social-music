const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const brotliPlugin = require('brotli-gzip-webpack-plugin')

console.log('Environment set to', process.env.NODE_ENV)

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: process.env.NODE_ENV === 'production' ? '' : 'eval-source-map',
    entry: [
        'babel-polyfill',
        path.join(__dirname, 'public', 'src', 'index.js')
    ],
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            title: "Social Music Dapp",
            template: path.join('public', 'src', 'index.ejs'),
            hash: true,
        }),
        new brotliPlugin({
            asset: '[file].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            quality: 11,
        }),
        new brotliPlugin({
            asset: '[file].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
}
