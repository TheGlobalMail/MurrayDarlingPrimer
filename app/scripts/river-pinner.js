define(['jquery', 'lodash'], function($, _) {
  'use strict';

  var $river  = $('#river');
  var $window = $(window);
  var running = false;
  var contentOffsets = {};
  var contentOffset, pinnedToSection, lastScrollTop; // page offset due to header
  var listening = false;

  var contentPinPoints = {
    "introduction": $("#introduction"),
    "crops": $("#crops"),
    "livestock": $("#livestock-pinning-wrapper"),
    "rest": $("#rest")
  };

  var riverPinPoints = {
    "introduction": 0,
    "crops": 1370,
    "livestock": 2930,
    "rest": 4516
  };

  function cacheOffsets() {
    // cache content offsets
    _.each(contentPinPoints, function($el, key) {
      contentOffsets[key] = {
        top: Math.round($el.offset().top),
        bottom: Math.round($el.offset().top + $el.outerHeight(true))
      };
    });
  };

  function getNextOffset(key) {
    var getNext = false, foundKey;
    var offset = _.find(contentOffsets, function(offset, k) {
      if (getNext) {
        foundKey = k;
        return true;
      }

      if (key === k) {
        getNext = true; // flag to pickup next iteration
      }
    });

    return _.extend(offset, { key: foundKey });
  };

  function progressBetween(start, end, current) {
    var distance = end - start;
    var progress = current - start;
    return progress / distance;
  }

  function percentageCalc(offset, scrollTop) {
    var halfwayOffset = offset.top + (offset.bottom - offset.top) * 0.9;

    if (scrollTop <= halfwayOffset) {
      return 0;
    }

    var halfSection = offset.bottom - halfwayOffset;
    var distancePastHalfway = scrollTop - halfwayOffset;

    return distancePastHalfway / halfSection;
  };


  var checkPosition = function() {
    running = true;

    var reserved     = false;
    var scrollTop    = $window.scrollTop();
    var windowHeight = $window.height();
    var scrollBottom = scrollTop + windowHeight;

    // scrolling up or down?
    if (scrollTop < lastScrollTop) {
      reserved = true; // up
    }

    // save last scoll offset to track scroll direction
    lastScrollTop = scrollTop;

    _.each(contentOffsets, function(offset, key) {
      var percentThrough = percentageCalc(offset, scrollBottom);

      // at the bottom of a section, scroll the river quickly to catch up to the next deviation
      if (percentThrough <= 1 && percentThrough > 0 && pinnedToSection) {
        var nextOffset = getNextOffset(key);

        if (!nextOffset) {
          return;
        }

        var offsetDiff = riverPinPoints[nextOffset.key] - riverPinPoints[key] - windowHeight;
        var partialOffset = (offsetDiff * percentThrough) + riverPinPoints[key];
        $river.css({ position: 'fixed', top: -partialOffset });
        running = false;
        return;
      }

      // section of the top, pin the river
      if (offset.top < scrollTop && offset.bottom > scrollBottom) {
        $river.css({
          position: 'fixed',
          top: -riverPinPoints[key]
        });
        pinnedToSection = key;
        running = false;
        return;
      }

      // section coming into view, fix river to content
      if (offset.top >= scrollTop && offset.top < scrollBottom) {
        $river.css({
          position: 'absolute',
          top: offset.top - riverPinPoints[key] - contentOffset
        });
        running = false;
        return;
      }

      running = false;
    });
  };

  var run = function() {
    if ($river.is(':hidden') && listening) {
      $window.off('scroll.river-pinner');
      listening = false;
      return;
    }

    cacheOffsets();
    contentOffset = $('#main').offset().top;
    checkPosition();

    if ($river.is(':visible') && !listening) {
      $window.on('scroll.river-pinner', function() {
        if (!running) {
          checkPosition();
        }
      });
      listening = true;
    }
  }

  $window.on('resize', _.throttle(run, 200));

  $(function() {
    run();
  });

});
