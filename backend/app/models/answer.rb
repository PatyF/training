class Answer < ActiveRecord::Base
  belongs_to :activities
  belongs_to :users
end
