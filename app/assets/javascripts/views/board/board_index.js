Trello.Views.BoardIndex = Backbone.CompositeView.extend({
  template: JST["board/index"],

  events: {
    "click .delete_board" : "deleteBoard",
    "click .add-form": "addForm"
  },

  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, "sync change", this.render);
    this.listenTo(this.collection, 'add', this.addIndexItem);
    this.listenTo(this.collection, 'remove', this.removeIndexItem);
    $(document).on('keydown', this.handleKey.bind(this));
    this.collection.each(this.addIndexItem.bind(this));
  },

  render: function() {
    var content = this.template({boards: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addIndexItem: function(list) {
    var subview = new Trello.Views.IndexItem({model: list});
    this.addSubview('.boards-index', subview);
  },

  addForm: function () {
    var subview = new Trello.Views.BoardForm({ collection: this.collection });
    this.addSubview('.board-form', subview);
    $('#board_title').focus();
    $('#board_title').blur(this.removeForm.bind(this));
  },

  handleKey: function(e) {
    if (e.keyCode === 13) {
      this.removeForm();
    }
  },

  removeForm: function () {
    setTimeout(this._removeForm, 200);
  },

  _removeForm: function () {
    $('.board-form').html("");
  },

  deleteBoard: function(e) {
    e.preventDefault();
    var board_id = $(e.currentTarget).data("id");
    var board = this.collection.get(board_id);
    this.removeModelSubview(".boards-index", board);
    board.destroy();
  }

});
