require 'rails_helper'
require './app/controllers/api/v1/courses_controller'

RSpec.describe Api::V1::CoursesController, type: :api do
  let(:url) { "api/v1/courses.json" }

  before do
    user = User.create({:email => "paty@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => User::PROFILE_STUDENT, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "paty@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
  end

  it "creating a course" do
    post "#{url}", {
      :name => "Tutorial",
    	:keywords => "keyword"
    }

		post_json = JSON.parse last_response.body
		expect(post_json["id"]).to be
		expect(last_response.status).to eq(201)
	end

  it "should get only available courses for a student" do
    FactoryGirl.create(:course, :available => true)
    FactoryGirl.create(:course, :available => false)
    get "#{url}"

    post_json = JSON.parse last_response.body
    expect(post_json.length).to eq 1
  end

  it "should get only instructor's courses" do
    user = User.create({:email => "instructor@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => User::PROFILE_INSTRUCTOR, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "instructor@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"

    instructor = FactoryGirl.create(:user, :profile => User::PROFILE_INSTRUCTOR)
    FactoryGirl.create(:course, :available => true, :instructor_id => user[:id])
    FactoryGirl.create(:course, :available => false, :instructor_id => instructor[:id])
    get "#{url}"

    post_json = JSON.parse last_response.body
    expect(post_json.length).to eq 1
  end
end
