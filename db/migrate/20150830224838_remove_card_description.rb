class RemoveCardDescription < ActiveRecord::Migration
  def change
    remove_column :cards, :description, :text
  end
end
