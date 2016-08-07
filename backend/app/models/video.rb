class Video < ActiveRecord::Base
  validates :title, presence: true, length: { minimum:3 }
  validates :link, presence: true, length: { minimum:3 }
  belongs_to :modulo
end
