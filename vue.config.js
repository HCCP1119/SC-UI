module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        port: 80,
        disableHostCheck: true,
    },
    lintOnSave: false //关闭eslint检查
}