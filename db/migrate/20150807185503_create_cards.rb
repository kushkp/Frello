class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title, null: false
      t.integer :list_id, null: false
      t.integer :ord
      t.text :description, null: false
      t.timestamps null: false
    end

    add_index :cards, :list_id
  end
end
