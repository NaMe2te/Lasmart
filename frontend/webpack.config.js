var path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: `./src/app.ts`,
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};