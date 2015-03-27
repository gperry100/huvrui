// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "bootstrap":            "bower_modules/components-bootstrap/js/bootstrap.min",
        "material":             "bower_modules/bootstrap-material-design/dist/js/material.min",
        "ripples":              "bower_modules/bootstrap-material-design/dist/js/ripples.min",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "moment":               "bower_modules/moment/moment",
        "chartjs":              "bower_modules/chartjs/Chart.min",
        "text":                 "bower_modules/requirejs-text/text",
        "knockout-custom":      "other_modules/bskyb/knockout-custom",
        "data-store":           "other_modules/bskyb/data-store"
    },
    shim: {
        "bootstrap": { deps: ["jquery"] },
        "ripples": { deps: ["bootstrap"] },
        "material": { deps: ["ripples"] },
        "knockout-custom": { deps: ["knockout","chartjs","jquery"] }
    }
};
