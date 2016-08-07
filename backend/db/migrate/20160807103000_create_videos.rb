class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.belongs_to :modulo, index: true
      t.string :title
      t.string :link
      t.string :description

      t.timestamps null: false
    end
  end
end
