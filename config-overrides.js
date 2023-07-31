// const {
//   override,
//   addDecoratorsLegacy,
//   disableEsLint,
//   addBundleVisualizer,
//   addWebpackAlias,
//   fixBabelImports
// } = require("customize-cra");
// const rewireSass = require("react-app-rewire-scss");
// const path = require("path");

// module.exports = function customOverrides(config, env) {
//   config = rewireSass(config, env);
//   config = rewireSass.withLoaderOptions({
//     javascriptEnabled: true
//   })(config, env);
//   // with loaderOptions
//   // config = rewireSass.withLoaderOptions(someLoaderOptions)(config, env);
//   return config;
// };

// module.exports = override(
//   addDecoratorsLegacy(),
//   disableEsLint(),
//   fixBabelImports("import", {
//     libraryName: "antd",
//     libraryDirectory: "es",
//     style: "css"
//   }),
//   process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
//   addWebpackAlias({
//     components: path.resolve(__dirname, "./src/components"),
//     containers: path.resolve(__dirname, "./src/containers"),
//     pages: path.resolve(__dirname, "./src/pages"),
//     utils: path.resolve(__dirname, "./src/utils"),
//     helpers: path.resolve(__dirname, "./src/utils/helpers"),
//     hoc: path.resolve(__dirname, "./src/higherOrderComponents"),
//     settings: path.resolve(__dirname, "./src/settings"),
//     layouts: path.resolve(__dirname, "./src/layouts"),
//     localization: path.resolve(__dirname, "./src/localization"),
//     store: path.resolve(__dirname, "./src/store"),
//     src: path.resolve(__dirname, "./src"),
//     static: path.resolve(__dirname, "./src/static")
//   })
// );

const { injectBabelPlugin } = require("react-app-rewired");
const path = require("path");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./src/theme/antd.less"), "utf8")
);

module.exports = {
  webpack: function(config, env) {
    const rewireSass = require("react-app-rewire-scss");
    config = rewireSass(config, env);
    config = rewireSass.withLoaderOptions({
      javascriptEnabled: true
    })(config, env);
    const rewireLess = require("react-app-rewire-less");
    config = rewireLess(config, env);
    config = rewireLess.withLoaderOptions({
      javascriptEnabled: true,
      modifyVars: themeVariables
    })(config, env);
    config = injectBabelPlugin(
      ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
      config
    );
    config.resolve.alias = {
      config: path.resolve(__dirname, "./src/config"),
      components: path.resolve(__dirname, "./src/components"),
      containers: path.resolve(__dirname, "./src/containers"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
      helpers: path.resolve(__dirname, "./src/utils/helpers"),
      hoc: path.resolve(__dirname, "./src/hoc"),
      settings: path.resolve(__dirname, "./src/settings"),
      layouts: path.resolve(__dirname, "./src/layouts"),
      localization: path.resolve(__dirname, "./src/localization"),
      router: path.resolve(__dirname, "./src/router"),
      store: path.resolve(__dirname, "./src/store"),
      theme: path.resolve(__dirname, "./src/theme"),
      src: path.resolve(__dirname, "./src"),
      static: path.resolve(__dirname, "./src/static"),
      localStore: path.resolve(__dirname, "./node_modules/store")
    };
    return config;
  }
};
