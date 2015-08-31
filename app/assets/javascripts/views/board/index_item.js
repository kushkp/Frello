Trello.Views.IndexItem = Backbone.View.extend({
  template: JST["board/index_item"],
  model: Trello.Models.Board,
  tagName: "li",
  className: "index-item  list-group-item",

  render: function() {
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  }
});
