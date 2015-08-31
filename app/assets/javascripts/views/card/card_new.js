Trello.Views.CardNew = Backbone.View.extend ({
  template: JST['card/new'],

  initialize: function (options) {
    this.collection = options.collection;
  },

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }
  

});
