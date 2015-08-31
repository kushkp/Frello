Trello.Collections.Lists = Backbone.Collection.extend({
  url: '/api/lists',
  model: Trello.Models.List,

  // getOrFetch: function(id) {
  //   var list = this.get(id);
  //   if (!list) {
  //     list = new Trello.Models.List({id: id});
  //     this.add(list);
  //   }
  //   list.fetch();
  //
  //   return list;
  // },

  initialize: function(models, options) {
    this.board = options.board;
  },

  comparator: function (list) {
    return list.get('ord')
  }

});
