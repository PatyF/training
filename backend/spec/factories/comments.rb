FactoryGirl.define do
  factory :comment do
    association :course
    grade 3
    comment 'Gostei do curso'
  end
end
