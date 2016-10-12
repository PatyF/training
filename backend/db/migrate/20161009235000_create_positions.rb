class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.belongs_to :video, index: true
      t.belongs_to :user, index: true
      t.boolean :watched
      t.float :position

      t.timestamps null: false
    end
  end
end
