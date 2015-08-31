json.(@board, :title, :id, :user_id)

json.lists @board.lists.order(:ord) do |list|
  json.partial! 'api/lists/list', list: list
end
