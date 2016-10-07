FactoryGirl.define do
  factory :activity do
    association :modulo

    question "question"
    correct_answer "correct_answer"
    incorrect_answer_1 "incorrect_answer_1"
    incorrect_answer_2 "incorrect_answer_2"
    incorrect_answer_3 "incorrect_answer_3"
    incorrect_answer_4 "incorrect_answer_4"

  end
end
