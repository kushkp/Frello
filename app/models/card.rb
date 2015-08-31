class Card < ActiveRecord::Base
  validates :title, :list_id, :ord, presence: true

  belongs_to :list
end
