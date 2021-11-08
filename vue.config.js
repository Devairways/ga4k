module.exports = {
    configureWebpack: {
      resolve: {
        extensions: ['*', '.ts', '.vue', '.json']
        }
    },
    // chainWebpack: (config) => {
    //   config.module
    //     .rule("vue")
    //     .use("vue-loader")
    //     .tap((options) => {
    //       options.compilerOptions = {
    //         ...(options.compilerOptions || {}),
    //         isCustomElement: (tag) => /^x-/.test(tag),
    //       };
    //       return options;
    //     });
    // },
}
