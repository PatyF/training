class CreateModulos < ActiveRecord::Migration
  def change
    create_table :modulos do |t|
      t.belongs_to :course, index: true
      t.string :title
      t.string :description

      t.timestamps null: false
    end
  end
end
