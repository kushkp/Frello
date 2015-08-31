json.array!(@lists) do |list|
  json.(list, :id, :title, :board_id)
end
