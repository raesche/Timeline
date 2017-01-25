requirejs.config(
{
  baseUrl:"",
  
  shim:
  {
    "bootstrap": {deps: ['jquery']},
    "main": {deps: ['jquery', 'lodash', 'bootstrap']},
    "fileinput": {deps: ['jquery', 'bootstrap'], exports: "$.fn.fileinput"},
    "main": {deps: ['fileinput']},
  },
  
  paths:
  {
    "jquery": "libs/jquery/jquery-1.12.0.min",
    "bootstrap": "libs/bootstrap/js/bootstrap.min",
    "lodash": "libs/lodash/lodash.min",
    "backbone": "libs/backbone/backbone-min",
    "text": "libs/require/text",

    // plugins
    "main": "js/main",
    "fileinput": "plugins/bootstrap-fileinput/js/fileinput",
  },
  
  packages:
  [
    {
      name: "story",
      location: "plugins/bootstrap-story",
      main: "bootstrap-story"
    }
  ],
  
  map: {
    '*': {
      // Backbone requires underscore. This forces requireJS to load lodash instead:
      'underscore': 'lodash'
    }
  },

  
  // for development only!
  urlArgs: "bust=" + (new Date()).getTime(),
});

