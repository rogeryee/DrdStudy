requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal':'../lib/durandal/js',
    'plugins' : '../lib/durandal/js/plugins',
    'transitions' : '../lib/durandal/js/transitions',
    'knockout': '../lib/knockout/knockout-3.1.0',
    'jquery': '../lib/jquery/jquery-1.9.1'
    } 
});
 
define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  
    function (system, app, viewLocator) {

    system.debug(true);

    app.title = "Durandal Study";

    app.configurePlugins({
        router: true,
        widget: true
    });

    app.start().then(function() {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell', 'entrance');
    });
});