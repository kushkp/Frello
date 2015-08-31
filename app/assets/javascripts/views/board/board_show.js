Trello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["board/show"],

  events: {
    "submit .new_list" : "newList"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this.model.lists().each(this.addList.bind(this));
  },

  render: function() {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.lists').sortable({
      stop: function(event, ui){
        this.saveOrder();
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  saveOrder: function() {
    var listItems = $(".list");

      for(var i = 0; i < listItems.length; i++) {
        var listId = $(listItems[i]).data("id");
        var currentList = this.model.lists().get(listId);
        currentList.save({"list" : {"ord": i}});

      }
  },

  addList: function(list) {
    var listShow = new Trello.Views.ListShow({ model: list });
    this.addSubview(".lists", listShow);
  },


  removeList: function(list) {
    this.removeModelSubview(".lists", list);
  },

  newList: function(e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData.list.board_id = this.model.id;
    formData.list.ord = this.model.lists().length
    var new_list = new Trello.Models.List();
    new_list.save( formData, {
      success: function() {
        this.model.fetch();
      }.bind(this),
      error: function() {
        console.log("error");
      }
    });
  }

});
