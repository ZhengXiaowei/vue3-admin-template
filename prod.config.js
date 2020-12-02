const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

// * 避免打包项
const externals = isProd
  ? {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      axios: "axios",
      clipboard: "Clipboard",
    }
  : {};

// * 资源地址
const assets = isProd
  ? "static" + new Date().toLocaleDateString().replace(/\//g, "-")
  : "static";

const ossCDN = "/";

// * oss config
const ossConfig = {
  buildPath: "/",
  region: "",
  ak: "",
  sk: "",
  bucket: "",
};

// * 资源配置
const cdns = {
  dev: {},
  build: {
    css: [],
    js: [
      `${ossCDN}/library/vue.next.min.js`,
      `${ossCDN}/library/vuex.next.min.js`,
      `${ossCDN}/library/vue-router.next.min.js`,
      `${ossCDN}/library/axios.min.js`,
      `${ossCDN}/library/clipboard.min.js`,
    ],
  },
};

// * 公共代码抽离
const optimization = {
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        priority: 100,
        chunks: "all",
        minChunks: 1,
        maxInitialRequests: 5,
        minSize: 0,
      },
      common: {
        name: "chunk-common",
        test: /[\\/]src[\\/]ts[\\/]/,
        minChunks: 2,
        maxInitialRequests: 5,
        minSize: 0,
        priority: 60,
        chunks: "all",
        reuseExistingChunk: true,
      },
      antDesignVue: {
        name: "chunk-antdv",
        test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
        chunks: "initial",
        priority: 120,
        reuseExistingChunk: true,
        enforce: true,
      },
      styles: {
        name: "styles",
        test: /\.(sa|sc|c)ss$/,
        chunks: "all",
        enforce: true,
      },
      runtimeChunk: {
        name: "manifest",
      },
    },
  },
};

// * 打包后资源上传oss
const uploadAssetsToOSS = (config) => {
  config
    .plugin("webpack-aliyun-oss-plugin")
    .use(require("webpack-aliyun-oss-plugin"), [
      {
        buildPath: ossConfig.buildPath,
        region: ossConfig.region,
        ak: ossConfig.ak,
        sk: ossConfig.sk,
        bucket: ossConfig.bucket,
        filter: function(assets) {
          return !/\.html$/.test(assets);
        },
      },
    ]);
};

// * 打包gzip
const assetsGzip = (config) => {
  config
    .plugin("compression-webpack-plugin")
    .use(require("compression-webpack-plugin"), [
      {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$|\.json$|\.css/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: true, // 删除原文件
      },
    ]);
};

// * 代码压缩
const codeUglifyConfig = {
  uglifyOptions: {
    //生产环境自动删除console
    compress: {
      drop_debugger: true,
      drop_console: false,
      pure_funcs: ["console.log"],
    },
  },
  sourceMap: false,
  parallel: true,
};

const plugins = isProd
  ? [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HashedModuleIdsPlugin(),
      new UglifyJsPlugin(codeUglifyConfig),
    ]
  : [];

module.exports = {
  uploadAssetsToOSS,
  assetsGzip,
  plugins,
  externals,
  optimization,
  cdns,
  assets,
};
