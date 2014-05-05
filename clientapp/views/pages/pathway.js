var HumanView = require('human-view');
var templates = require('templates');
var Editor = require('../includes/editor');
var Pledged = require('../../models/pledged');

module.exports = HumanView.extend({
  template: templates.pages.pathway,
  render: function () {
    this.renderAndBind({
      pathway: this.model,
      user: window.app.currentUser
    });
    this.renderSubview(new Editor({
      collection: this.collection,
      mode: 'view'
    }), '.pathway-editor-container');
    return this;
  },
  events: {
    'click .js-pledge-button': 'pledge'
  },
  pledge: function (evt) {
    if (window.app.currentUser.loggedIn) {
      var pledged = new Pledged({
        userId: window.app.currentUser.id,
        cloneId: this.model._id
      });
      pledged.save().done(function (model, status, xhr) {
        window.app.router.navigateTo('/pledged/' + model._id);
      });
    }
    else {
      window.app.startLogin();
    }
    evt.preventDefault();
    evt.stopPropagation();
  }
});
