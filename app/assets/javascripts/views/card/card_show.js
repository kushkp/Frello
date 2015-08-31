Trello.Views.CardShow = Backbone.View.extend({
  template: JST["card/show"],
  className: 'card',

  attributes: function() {
      return {
        "data-id": this.model.id
      };

  },

  events: {
    "click .delete_card" : "deleteCard"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({card: this.model});
    this.$el.html(content);
    return this;
  },

  deleteCard: function(e) {
    e.preventDefault();
    this.model.destroy();
  }
});
