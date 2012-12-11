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

require(['app'], function() {
  'use strict';

function hideAddressBar()
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
}

window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
window.addEventListener("orientationchange", hideAddressBar );
});
