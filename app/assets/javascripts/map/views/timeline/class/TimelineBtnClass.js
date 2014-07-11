/**
 * The Timeline view module.
 *
 * Timeline for all layers configured by setting layer-specific options.
 *
 * @return Timeline view (extends Backbone.View).
 */
define([
  'underscore',
  'backbone',
  'moment',
  'd3',
  'handlebars',
], function(_, Backbone, moment, d3, Handlebars) {

  'use strict';

  var TimelineBtnClass = Backbone.View.extend({

    className: 'timeline-btn',

    initialize: function(layer) {
      this.layer = layer;
      this.name = layer.slug;

      this.opts = _.extend({
        dateRange: [moment([2001]), moment()],
        playSpeed: 400,
      }, this.opts);

      // Status
      this.playing = false;

      // d3 slider objets
      this.svg = {};
      this.xscale = {};
      this.brush = {};
      this.slider = {};
      this.handlers = {
        left:{},
        right:{}
      };

      this.render();
    },

    /**
     * Render d3 timeline slider.
     */
    render: function() {
      var self = this;
      this.$timeline = $('.timeline');
      this.$timeline.append(this.el);

      // SVG options
      var margin = {top: 0, right: 30, bottom: 0, left: 30};
      var width = 949 - margin.left - margin.right;
      var height = 50 - margin.bottom - margin.top;

      // Set xscale
      this.xscale = d3.scale.linear()
          .domain([this.options.dateRange[0].month(), this.options.dateRange[1].month()])
          .range([0, width])
          .clamp(true);

      var data = this._getData();

      // Set SVG
      this.ticks = d3.select(this.el)
        .append('ul')
        .attr('class', 'ticks')
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .text(function(d) {
          return d;
        });

      this.ticks.selectAll('li')
        .on('click', this._onClick);

/*          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('class', 'a')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
*/ 
    },

    _onClick: function(d, i) {
      console.log(d, i);
    },

    /**
     * Handles a timeline date change UI event by dispaching
     * to TimelinePresenter.
     *
     * @param {Array} timelineDate 2D array of moment dates [begin, end]
     */
    updateTimelineDate: function(date) {
      this.presenter.updateTimelineDate(date);
    },

    getName: function() {
      return this.name;
    }
  });

  return TimelineBtnClass;

});
