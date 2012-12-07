define(['jquery', 'TweenMax', 'superscrollorama'], function($, TweenMax) {
  'use strict';

  var $drop = $('.drop');
  var $headings = $('h1, h2', '.intro-banner');
  var $main = $('#content-container').fadeTo(0, 0.1);
  var controller = $.superscrollorama()

  var pins = new TimelineLite({ useFrames: true, delay: -10 });
  var fadeOut = TweenMax.to($headings, 0.1, { css: { opacity: 0 } });
  var fadeIn  = TweenMax.to($main, 0.1, { css: { opacity: 1 } });

  // fade headings out
  controller.addTween($headings, fadeOut, 200, 190);

  // pin drop
  pins.append(TweenMax.to($drop, 0.5, { css: { marginTop: 190 } }));
  controller.pin($drop, 500, { anim: pins, offset: -60, onUnpin: function() { $main.fadeIn(); } });

});
