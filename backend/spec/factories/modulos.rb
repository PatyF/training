FactoryGirl.define do
  factory :modulo do
    association :course

    title "introducao"
    description "descricao do video"
  end
end
