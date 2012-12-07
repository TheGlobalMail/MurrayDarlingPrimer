define(['d3', 'lodash', 'jquery', 'accounting', 'jquery.scrollwatch'], function(d3, _, $, accounting) {
  'use strict';

  var RiverSystemLength = {

    data: [
      { name: 'Murray-Darling River Systems', length: 3672, color: 'blue' },
      { name: 'Rio-Grande', location: 'USA/Mexico', length: 3057, color: 'green' },
      { name: 'Danube-Breg', location: 'Europe', length: 2888, color: 'orange' },
      { name: 'Zambesi', location: 'Africa', length: 2693, color: 'yellow' }
    ]

  };

  var data = RiverSystemLength.data;


  RiverSystemLength.init = function() {
    var totalBarHeight = 65;
    var graphWidth = 540;
    var max = _.chain(data).pluck('length').max().value();
    var $graph = $('#length-graph-container');
    var graph = d3.select('#length-graph-container')
      .append('svg')
      .attr('width', graphWidth)
      .attr('height', data.length * totalBarHeight);

    var x = function(prop) {
      var scale = d3.scale.linear()
        .domain([0, max])
        .range([0, graphWidth]);

      return function(data) {
        return scale(data[prop])
      }
    }

    var yoink = function(prop, fn) {
      fn = fn || function(d) { return d; };
      return function(data) { return fn(data[prop]); };
    }

    var g = graph.selectAll('g').data(data).enter().append('g');

    graph.append('defs').append('svg:pattern')
      .attr('id', 'barstripesbackground')
      .attr('height', 1)
      .attr('width', 0.5)
      .append('image')
        .attr('xlink:href', '/images/bar-stripes.png')
        .attr('height', 30)
        .attr('width', 303)
        .attr('x', 0).attr('y', 0);

    // bar background
    g.append('rect')
      .attr('y', function(d, i) { return i * totalBarHeight + (totalBarHeight - 20); })
      .attr('width', graphWidth)
      .attr('height', 20)
      .attr('fill', 'url(#barstripesbackground)');

    // bars
    var bars = g.append('rect')
      .attr('y', function(d, i) { return i * totalBarHeight + (totalBarHeight - 20); })
      .attr('width', 0)
      .attr('height', 20)
      .attr('class', yoink('color'));

    $graph.scrollWatch({ delay: 200 })
      .on('scrollin', function(e) {
        if (bars.attr('width') == 0) {
          bars.transition().ease('cubic-out').attr('width', x('length'));
        }
      })
      .on('scrollout', function(e) {
        if (e.direction === 'up') {
          bars.attr('width', 0);
        }
      }).handleScroll();

    var textWidths = [];

    // length text
    g.append('text')
      .attr('y', function(d, i) { return i * totalBarHeight + 40; })
      .attr('x', graphWidth)
      .attr('text-anchor', 'end')
      .attr('class', 'length')
      .text(yoink('length', function(l) { return accounting.formatNumber(l) + "km" }))
      .each(function(d, i) {
        if (i === 0) {
          this.setAttribute('class', this.getAttribute('class') + " first");
        }
      });

    // river system names
    g.append('text')
      .attr('y', function(d, i) { return i * totalBarHeight + 40 })
      .attr('x', 0)
      .attr('class', 'name')
      .text(yoink('name', function(t) { return t.toUpperCase(); }))
      .each(function(d, i) {
        textWidths[i] = this.getBBox().width;
      });

    g.append('text')
      .filter(function(d) { return d.location; })
      .attr('y', function(d, i) { return (i+1) * totalBarHeight + 40 })
      .attr('x', function(d, i) { return textWidths[i+1] + 5; })
      .attr('class', 'location')
      .text(yoink('location', function(t) { return '(' + t.toUpperCase() + ')'; }));
  };

  return RiverSystemLength;
});
