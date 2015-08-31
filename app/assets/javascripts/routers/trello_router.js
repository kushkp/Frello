Trello.Routers.TrelloRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.boards = options.boards || new Trello.Collections.Boards();
    this.$rootEl = options.$rootEl || $(".main");
  },

  routes: {
    "" : "boardIndex",
    "boards/:id" : "boardShow"
  },

  boardIndex: function() {
    var view = new Trello.Views.BoardIndex({collection: this.boards});
    this.boards.fetch();
    this._swapView(view);
  },

  boardShow: function(id) {
    var board = this.boards.getOrFetch(id);
    var view = new Trello.Views.BoardShow({ model: board });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
