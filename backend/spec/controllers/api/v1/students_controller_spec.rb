require 'rails_helper'
require './app/controllers/api/v1/students_controller'

RSpec.describe Api::V1::StudentsController, type: :api do

  before do
    @user = User.create({:email => "paty@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => User::PROFILE_ADMIN, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "paty@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
  end

  it "should get all registries student" do
    student = FactoryGirl.create(:user, :profile => User::PROFILE_STUDENT)
    course = FactoryGirl.create(:course)
    modulo = FactoryGirl.create(:modulo, :course_id => course.id)
    video = FactoryGirl.create(:video, :modulo_id => modulo.id)
    activity = FactoryGirl.create(:activity, :modulo_id => modulo.id)
    registry = FactoryGirl.create(:registry, :user_id => student.id, :course_id => course.id)
    get "api/v1/students/#{student.id}/grades.json"

    post_json = JSON.parse last_response.body
    expect(post_json["grades"][0]["name"]).to eq course.name
  end
end
