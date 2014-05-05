var HumanView = require('human-view');
var templates = require('templates');
var util = require('util');

module.exports = HumanView.extend({
  template: templates.includes.achievement,
  initialize: function () {
    this.listenTo(this.model, 'change:favorite', function (model, val) {
      this.model.save({favorite: val}, {patch: true});
    });
  },
  classBindings: {
    userFavorite: '.js-favorite-icon'
  },
  render: function (opts) {
    var container = opts.containerEl;
    this.renderAndBind(this.model);
    this.$el.appendTo(container);
  },
  events: {
    'click .js-view-item': 'navToItem',
    'click .js-toggle-wishlist': 'toggleWishlist'
  },
  navToItem: function (evt) {
    var item = this.model;
    var url = util.format('%s/%s', item.type, item._id);
    app.router.navigateTo(url, item);
    evt.preventDefault();
    evt.stopPropagation();
  },
  toggleWishlist: function (evt) {
    if (window.app.currentUser.loggedIn) {
      this.model.favorite = !this.model.favorite;
    }
    else {
      window.app.once('login', function (result) {
        if (result === 'success') this.model.favorite = true;
      }.bind(this));
      window.app.startLogin();
    }
    evt.preventDefault();
    evt.stopPropagation();
  }
});
