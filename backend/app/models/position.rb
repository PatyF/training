class Position < ActiveRecord::Base
  belongs_to :videos
  belongs_to :users
end
