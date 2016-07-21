let path = require('path')
let webpack = require('webpack')

module.exports = {
    entry: [path.join(__dirname, 'src/client.js')],

    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['react-hmre']
                }
            }, {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                loader: 'file'
            }
        ]
    },

    resolve: {
        extensions: [
            '', '.json', '.js', '.jsx'
        ],
        root: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'node_modules')
        ]
    },

    plugins: [new webpack.HotModuleReplacementPlugin()]
}
