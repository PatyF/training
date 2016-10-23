class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.belongs_to :modulo, index: true
      t.string :name
      t.timestamps null: false
    end
  end
end
