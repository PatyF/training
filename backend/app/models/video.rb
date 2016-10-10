class Video < ActiveRecord::Base
  validates :title, presence: true, length: { minimum:3 }
  validates :link, presence: true, length: { minimum:3 }
  belongs_to :modulo
  has_many :positions
  has_many :users, through: :positions
end
