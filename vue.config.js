const path = require('path');
module.exports = {
  devServer: {
    // devServerのドキュメント https://webpack.js.org/configuration/dev-server/
    port: 8080,
    disableHostCheck: true,
    clientLogLevel: "trace"
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    resolve: {
      alias: {
        //"@": path.join(__dirname, "/src/")
      }
    },
    optimization: {
      splitChunks: false,
    },
    plugins: [
    ],
    devServer: {
      clientLogLevel: 'info'
    },
    devtool: "cheap-module-source-map", // vue-cli-service build --mode development で出力したjsでeval("ソースコード")の部分を無くす時はon
  },
  pages: {
    index: {
      entry: "src/app-entry/index.ts",
      template: "src/app-entry/index.html",
      title: "vueのindex"
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear();
    svgRule
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // このoptionsの値はundefinedの場合がある。
        if (!options) { options = {}; }
        options.limit = 10 * 1024;
        return options;
      });
    config.module
      .rule('images') // ここのimages とかは、vue-cli をデバッグ実行して変数を見るのが一番早い。結構色々ある
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        if (!options) { options = {}; }
        options.limit = 10 * 1024;//画像に対するurl-loaderのオプションを書き換える。デフォルトは4098byte
        return options
      });
  },
  filenameHashing: false,
  publicPath: process.env.PUBLIC_PATH || "/", // 通常は「/」 servの時のURLと、build app の時に使われるっぽい
  outputDir: "build-result/unused" // buildの時、引数で指定されるので未使用のはず
}