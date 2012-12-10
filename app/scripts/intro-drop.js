define(['jquery', 'scrollcontroller'], function($, scrollorama) {
  'use strict';

  var $drop = $('.drop');
  var $headings = $('h1, h2', '.intro-banner');
  var $main = $('.fade-wrapper').fadeTo(0, 0);

  scrollorama.animate($headings, {
    duration: 160, property: 'opacity', end: 0
  });

  scrollorama.animate($drop, {
    duration: 200, property: 'padding-top', end: 450, delay: 170
  });

  scrollorama.animate($main, {
    duration: 30, property: 'opacity', end: 1, delay: 605
  });

});
