# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!({email: "Guest@guest.com", password: "testtest"})

Board.create!({title: "How to win a car", user_id: 1})
Board.create!({title: "Flying with birds", user_id: 1})
Board.create!({title: "School", user_id: 1})


List.create!({title: "Gamble in Vegas", board_id: 1, ord: 1})
List.create!({title: "Enter in Sweepstakes", board_id: 1, ord: 2})
List.create!({title: "Homework", board_id: 3, ord: 1})
List.create!({title: "Grocery list for lunch", board_id: 3, ord: 2})


Card.create!({title: "Play the tarzan slots", list_id: 1, ord: 1})
Card.create!({title: "Do not buy souvenirs", list_id: 1, ord: 2})
Card.create!({title: "Find smallest contest to enter", list_id: 2, ord: 1})
Card.create!({title: "Fill out many entries", list_id: 2, ord: 2})
Card.create!({title: "peanut butter", list_id: 3, ord: 1})
Card.create!({title: "jelly", list_id: 3, ord: 2})
