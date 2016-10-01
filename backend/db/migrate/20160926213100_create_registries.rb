class CreateRegistries < ActiveRecord::Migration
  def change
    create_table :registries do |t|
      t.belongs_to :course, index: true
      t.belongs_to :user, index: true
      t.date :initial_date
      t.date :final_date

      t.timestamps null: false
    end
  end
end
