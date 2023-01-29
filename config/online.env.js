module.exports = {
  BASE_API: '',
  build:{
    assetsDir: 'static',
    assetsPublicPath: './',
    publicPath: '../../',
    output: { // 出口文件
      path: __dirname + "/dist", // 打包后存放的地方
      filename: "bundle.js", // 打包后的文件命名
      publicPath: '/'
    },
  }
};
