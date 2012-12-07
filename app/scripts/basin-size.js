define(['lodash', 'jquery', 'TweenMax', 'superscrollorama'], function(_, $, TweenMax) {
    'use strict';

    var $france = $('.france-map.map');
    var offset = document.documentElement.clientHeight / -2.8;

    return {
        init: function() {
            var controller = $.superscrollorama();
            var fadeTween = TweenMax.from($france, 0.1, { css: { opacity: 0 } });
            controller.addTween($france, fadeTween, 200, offset);
        }
    }
});
