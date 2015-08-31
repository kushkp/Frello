json.(list, :id, :board_id, :title, :ord)

json.cards list.cards.order(:ord) do |card|
  json.(card, :id, :list_id, :title, :ord)
end
