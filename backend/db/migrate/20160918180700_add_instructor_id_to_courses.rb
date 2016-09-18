class AddInstructorIdToCourses < ActiveRecord::Migration
  def change
    change_table :courses do |t|
      t.belongs_to :instructor, index: true
    end
  end
end
