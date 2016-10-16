class AddWorkloadToCourses < ActiveRecord::Migration
  def change
    change_table :courses do |t|
      t.string :workload
    end
  end
end
