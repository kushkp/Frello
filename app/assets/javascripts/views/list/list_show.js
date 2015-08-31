Trello.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["list/show"],

  events: {
    "click .delete_list" : "deleteList",
    "submit .new_card" : "newCard"
  },

  className: "list-container",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    this.model.cards().each(this.addCard.bind(this));
  },

  render: function() {
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('.cards').sortable({
      connectWith: '.cards',
      stop: function (event, ui){
        if (!ui.sender) {
          this.saveOrder(ui);
        }
      }.bind(this),
      receive: function (event, ui) {
        this.saveNewList(ui);
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  addCard: function(card) {
    var cardShow = new Trello.Views.CardShow({ model: card });
    this.addSubview(".cards", cardShow);
  },

  removeCard: function(card) {
    this.removeModelSubview(".cards", card);
  },

  deleteList: function(e) {
    e.preventDefault();
    this.model.destroy();
  },

  saveOrder: function(options) {
    var cardItems = this.$(".card");

    for(var i = 0; i < cardItems.length; i++) {
      var cardId = $(cardItems[i]).data("id");
      var currentCard = this.model.cards().getOrFetch(cardId)
      currentCard.save({"card" : {"ord": i}})
    }
  },

  saveNewList: function (ui) {
    var cardId = ui.item.find('.card').data('id')
    var currentCard = new Trello.Models.Card({ id: cardId });
    var newListId = this.model.id
    currentCard.fetch({
      success: function (model) {
        model.save({"card": {'list_id': newListId}});
        this.saveOrder();
      }.bind(this)
    });
  },

  newCard: function(e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON();
    formData.card.list_id = this.model.id;
    formData.card.ord = this.model.cards().length
    var new_card = new Trello.Models.Card();
    new_card.save( formData, {
      success: function() {
        this.model.fetch();
      }.bind(this),
      error: function() {
        console.log("error");
      }
    });
  }

});
