json.array!(@cards) do |card|
  json.(card, :id, :title, :list_id)
end
