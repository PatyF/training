require 'rails_helper'
require './app/controllers/api/v1/activities_controller'

RSpec.describe Api::V1::ActivitiesController, type: :api do
  before do
    user = User.create({:email => "paty@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => 2, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "paty@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
  end

  it "should not return the correct answer if the student did not answer" do
    activity = FactoryGirl.create(:activity)
    get "api/v1/courses/#{activity.modulo.course_id}/modulos/#{activity.modulo.id}/activities/#{activity.id}/question_student.json"

		post_json = JSON.parse last_response.body
		expect(post_json["answer_correct"]).to be nil
	end

  it "should return the correct answer if the student answered" do
    activity = FactoryGirl.create(:activity)
    user = FactoryGirl.create(:user)
    post "auth_user", {:email => "patricia@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
    answer = FactoryGirl.create(:answer, user_id: user.id, activity_id: activity.id, answer_student: 1)

    get "api/v1/courses/#{activity.modulo.course_id}/modulos/#{activity.modulo.id}/activities/#{activity.id}/question_student.json"

    post_json = JSON.parse last_response.body
    expect(post_json["answer_correct"]).equal? "answer_a"
  end

end
