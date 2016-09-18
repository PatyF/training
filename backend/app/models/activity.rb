class Activity < ActiveRecord::Base
  validates :question, presence: true, length: { minimum:3 }
  validates :correct_answer, presence: true, length: { minimum:3 }
  validates :incorrect_answer_1, presence: true, length: { minimum:3 }
  validates :incorrect_answer_2, presence: true, length: { minimum:3 }
  validates :incorrect_answer_3, presence: true, length: { minimum:3 }
  validates :incorrect_answer_4, presence: true, length: { minimum:3 }
  belongs_to :modulo
end
