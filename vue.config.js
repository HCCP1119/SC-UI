const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    parallel: false,
    outputDir: 'dist',
    assetsDir: 'static',
    css: {
        loaderOptions: {
            sass: {
                sassOptions: { outputStyle: "expanded" }
            }
        }
    },
    configureWebpack:{
        name: "SC-note",
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        performance:{
            maxEntrypointSize: 5000000000,
            maxAssetSize: 30000000000
        }
    },
    devServer: {
        publicPath:'/',
        overlay: {
            warnings: false,
            errors: true
        },
        port: 80,
        disableHostCheck: true,
    },
    lintOnSave: false,
    productionSourceMap: false,// 生产环境是否要生成 sourceMap,
}