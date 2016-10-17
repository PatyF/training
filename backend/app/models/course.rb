class Course < ActiveRecord::Base
  validates :name, presence: true, length: { minimum:3 }
  validates :workload, presence: true
  belongs_to :instructor
  has_many :modulos
  has_and_belongs_to_many :categories
  has_many :registries
  has_many :users, through: :registries
  has_many :comments
  has_many :users, through: :comments

  def number_videos
    count = 0
    self.modulos.find_each do |modulo|
        count+= modulo.number_videos
    end
    count
  end

  def watched_videos current_user
    count = 0
    self.modulos.find_each do |modulo|
        count+= modulo.watched_videos(current_user)
    end
    count
  end

  def number_activities
    count = 0
    self.modulos.find_each do |modulo|
        count+= modulo.number_activities
    end
    count
  end

  def answered_activities current_user
    count = 0
    self.modulos.find_each do |modulo|
        count+= modulo.answered_activities(current_user)
    end
    count
  end

  def correct_answers current_user
    count = 0
    self.modulos.find_each do |modulo|
        count+= modulo.correct_answers(current_user)
    end
    count
  end

  def grade current_user
    return 100 if self.number_activities == 0
    self.correct_answers(current_user) * 100 / self.number_activities
  end

  def generate_certificate current_user
    return false if self.number_videos != self.watched_videos(current_user)
    return false if self.number_activities != self.answered_activities(current_user)
    return false if self.grade(current_user) < 70
    true
  end

  def average_grades
    sum = 0
    count = 0
    self.comments.find_each do |comment|
      sum+= comment.grade
      count+= 1
    end
    return 0 if count == 0
    return sum/count
  end
end
