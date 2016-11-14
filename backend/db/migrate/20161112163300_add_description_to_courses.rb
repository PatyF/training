class AddDescriptionToCourses < ActiveRecord::Migration
  def change
    change_table :courses do |t|
      t.string :description
    end
  end
end
