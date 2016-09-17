class User < ActiveRecord::Base
  validates :name, presence: true, length: { minimum:3 }
  validates :email, presence: true, length: { minimum:3 }
  validates :gender, presence: true
  validates :birthday, presence: true
  validates :profile, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
