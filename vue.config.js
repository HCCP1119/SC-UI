module.exports = {
    parallel: false,
    css: {
        loaderOptions: {
            sass: {
                sassOptions: { outputStyle: "expanded" }
            }
        }
    },
    configureWebpack:{
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
    lintOnSave: false
}