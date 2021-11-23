module.exports = {
    configureWebpack: {
      resolve: {
        extensions: ['*', '.ts', '.vue', '.json']
        }
    },

    pluginOptions: {
      i18n: {
        locale: 'nl',
        fallbackLocale: 'nl',
        localeDir: 'locales',
        enableLegacy: true,
        runtimeOnly: false,
        compositionOnly: true,
        fullInstall: true
      }
    }
}
