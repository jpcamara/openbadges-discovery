var HumanView = require('human-view');
var templates = require('templates');
var AchievementView = require('./achievement');

module.exports = HumanView.extend({
  template: templates.includes.listing,
  render: function () {
    this.renderAndBind({});
    if (this.collection.length) {
      this.renderCollection(this.collection, AchievementView, this.$('.js-items')[0]);
    }
    return this;
  },
  events: {
    'click .js-view-more': 'viewMore'
  },
  viewMore: function (evt) {
    this.collection.addPage();
    evt.preventDefault();
    evt.stopPropagation();
  }
});
