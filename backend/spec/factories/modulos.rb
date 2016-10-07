FactoryGirl.define do
  factory :modulo do
    association :course
    
    title "introducao"
  end
end
