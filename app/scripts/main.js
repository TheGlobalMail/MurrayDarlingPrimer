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
    scrollorama: {
        exports: '$.scrollorama',
        deps: ['jquery']
    }
  },

  paths: {
    jquery: '/components/jquery/jquery',
    d3: '/components/d3/d3.v2',
    backbone: '/components/backbone/backbone',
    lodash: '/components/lodash/lodash',
    'jquery.scrollwatch': '/vendor/jquery.scrollwatch',
    accounting: '/components/accounting/accounting',
    scrollorama: '/components/jquery.scrollorama/js/jquery.scrollorama'
  }
});

window.isMobileSafari = !!navigator.userAgent.match(/iPhone|iPad/i);

if (window.isMobileSafari) {
  $('html').addClass('mobile-safari');
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

require(['basin-size', 'production-percentage-chart', 'river-system-length', 'water-trading'], function() {
  'use strict';

  function hideAddressBar() {
    if (!window.location.hash) {
      if (document.height < window.outerHeight) {
        document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout(function(){ window.scrollTo(0, 1); }, 50);
    }
  }

  window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
  window.addEventListener("orientationchange", hideAddressBar );
});
