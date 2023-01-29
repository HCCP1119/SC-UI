const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
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
            maxEntrypointSize: 10000000,
            maxAssetSize: 30000000
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