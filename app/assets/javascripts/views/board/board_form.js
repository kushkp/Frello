Trello.Views.BoardForm = Backbone.View.extend({
  template: JST["board/form"],

  events: {
    "submit .new_board" : "submit"
  },

  render: function() {
    var content = this.template({board: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function(e) {
    e.preventDefault();
    var formdata = $(e.currentTarget).serializeJSON();
    this.board = new Trello.Models.Board();
    this.board.save(formdata, {
      success: function() {
        this.collection.add(this.board);
      }.bind(this),
      error: function() {
        console.log("error");
      }
    });
  }
});
