module.exports = {
    devServer: {
        overlay: {
            warnings: false, //不显示警告
            errors: true //不显示错误
        },
        port: 80,
    },
    lintOnSave: false //关闭eslint检查
}