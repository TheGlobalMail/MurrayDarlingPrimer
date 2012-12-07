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
    },
    accouting: {
        exports: 'accounting'
    },
    TweenMax: {
        exports: 'TweenMax'
    },
    superscrollorama: {
        exports: '$.superscrollorama',
        deps: ['TweenMax']
    }
  },

  paths: {
    jquery: '/components/jquery/jquery',
    d3: '/components/d3/d3.v2',
    backbone: '/components/backbone/backbone',
    lodash: '/components/lodash/lodash',
    'jquery.scrollwatch': '/vendor/jquery.scrollwatch',
    accounting: '/components/accounting/accounting',
    TweenMax: '/components/superscrollorama/js/greensock/TweenMax.min',
    superscrollorama: '/components/superscrollorama/js/jquery.superscrollorama'
  }
});

require(['/vendor/classList.js', 'app'], function() {
  'use strict';


});
