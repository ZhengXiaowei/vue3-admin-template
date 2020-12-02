const prodConfig = require("./prod.config");

module.exports = {
  publicPath: process.env.VUE_APP_PUB_URL,
  assetsDir: prodConfig.assets,
  productionSourceMap: false,
  devServer: {
    // * 接口跨域处理
    proxy: {
      "/api": {
        target: process.env.PROXY_API_URL,
        changeOrigin: true,
      },
    },
    disableHostCheck: true,
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/scss/variables.scss";`,
      },
      less: {
        lessOptions: {
          modifyVars: {
            "primary-color": "#39a4ff",
            "link-color": "#39a4ff",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    externals: prodConfig.externals,
    optimization: prodConfig.optimization,
    plugins: prodConfig.plugins,
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts"],
    },
    performance: {
      hints: false,
    },
  },
  chainWebpack: (config) => {
    // * 移除prefetch和preload
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    if (process.env.NODE_ENV === "production") {
      // config.entry("index").add("babel-polyfill");
      prodConfig.uploadAssetsToOSS(config);
      // prodConfig.assetsGzip(config);
      config.optimization.delete("splitChunks");
      config.plugin("html").tap((args) => {
        // 加上属性引号
        args[0].minify.removeAttributeQuotes = false;
        args[0].cdn = prodConfig.cdns.build;
        return args;
      });
    }
  },
};
