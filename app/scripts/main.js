require.config({
  shim: {
    d3: {
        exports: 'd3'
    },
    lodash: {
        exports: '_'
    },
    backbone: {
        exports: 'Backbone',
        deps: ['lodash', 'jquery']
    },
    'jquery.scrollwatch': {
        exports: 'ScrollWatch',
        deps: ['jquery']
    }
  },

  paths: {
    jquery: '/components/jquery/jquery',
    d3: '/components/d3/d3.v2',
    backbone: '/components/backbone/backbone',
    lodash: '/components/lodash/lodash',
    'jquery.scrollwatch': '/vendor/jquery.scrollwatch'
  }
});

require(['app'], function() {
  'use strict';


});
