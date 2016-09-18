class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.belongs_to :modulo, index: true
      t.string :question
      t.string :correct_answer
      t.string :incorrect_answer_1
      t.string :incorrect_answer_2
      t.string :incorrect_answer_3
      t.string :incorrect_answer_4

      t.timestamps null: false
    end
  end
end
