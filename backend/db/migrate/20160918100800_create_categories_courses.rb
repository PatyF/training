class CreateCategoriesCourses < ActiveRecord::Migration
  def change
    create_table :categories_courses, id: false do |t|
      t.belongs_to :course, index: true
      t.belongs_to :category, index: true
    end
  end
end
