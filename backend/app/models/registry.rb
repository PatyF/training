class Registry < ActiveRecord::Base
  validates :initial_date, presence: false
  validates :final_date, presence: false
  belongs_to :courses
  belongs_to :users
end
