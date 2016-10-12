FactoryGirl.define do
  factory :video do
    association :modulo

    title "Novo Vídeo"
    link "link"
    description "Video"
  end
end
