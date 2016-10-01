class Course < ActiveRecord::Base
  validates :name, presence: true, length: { minimum:3 }
  belongs_to :instructor
  has_many :modulos
  has_and_belongs_to_many :categories
  has_many :registries
  has_many :users, through: :registries

  def builder_show
    Jbuilder.new do |course|
      course.id self.id
      course.name self.name
      course.keywords self.keywords
      course.instructor_id self.instructor_id
      course.available self.available
      course.categories self.categories
    end
  end
end
