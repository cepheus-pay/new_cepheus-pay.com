const Encore = require('@symfony/webpack-encore');
const path = require("path");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/public/build')

    .enableSassLoader(function(options) {}, {
        resolveUrlLoader: false
    })

    .addEntry('js/app', './assets/js/app.js')
    .addStyleEntry('css/landing', './assets/scss/landing.scss')
    .addStyleEntry('css/home', './assets/scss/home.scss')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    // enables hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .disableSingleRuntimeChunk()

    //f* windows
    .configureCssLoader(function(config) {
        config.url = false;
    })
;

module.exports = Encore.getWebpackConfig();
