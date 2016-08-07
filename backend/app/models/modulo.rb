class Modulo < ActiveRecord::Base
  validates :title, presence: true, length: { minimum:3 }
  belongs_to :course
  has_many :videos
end
