class Modulo < ActiveRecord::Base
  validates :title, presence: true, length: { minimum:3 }
  belongs_to :course
  has_many :videos
  has_many :activities

  def number_videos
    self.videos.length
  end

  def watched_videos current_user
    count = 0
    self.videos.find_each do |video|
      position = video.positions.where(user_id: current_user.id)
      if position.length > 0
        count+=1 if position.first.watched == true
      end
    end
    count
  end

  def number_activities
    self.activities.length
  end

  def answered_activities current_user
    count = 0
    self.activities.find_each do |activity|
      answer = activity.answers.where(user_id: current_user.id)
      if answer.length > 0
        if answer.first.answer_student != nil
          count+=1
        end
      end
    end
    count
  end
end
