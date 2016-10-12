class Modulo < ActiveRecord::Base
  validates :title, presence: true, length: { minimum:3 }
  belongs_to :course
  has_many :videos
  has_many :activities

  def watched_videos? current_user
    self.videos.find_each do |video|
      position = video.positions.where(user_id: current_user.id)
      if position.length > 0
        return false if position.first.watched != true
      else
        return false
      end
    end
    return true
  end
end
