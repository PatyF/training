class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.belongs_to :user, index: true
      t.belongs_to :activity, index: true
      t.integer :answer_a
      t.integer :answer_b
      t.integer :answer_c
      t.integer :answer_d
      t.integer :answer_e
      t.integer :answer_student

      t.timestamps null: false
    end
  end
end
