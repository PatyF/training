FactoryGirl.define do
  factory :user do
    email "patricia@knap.com.br"
    name "Patricia"
    birthday "1989-09-22"
    profile 0
    password "password"
    password_confirmation "password"
  end
end
