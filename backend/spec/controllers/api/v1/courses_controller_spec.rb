require 'rails_helper'
require './app/controllers/api/v1/courses_controller'

RSpec.describe Api::V1::CoursesController, type: :api do
  let(:url) { "api/v1/courses" }

  before do
    user = User.create({:email => "paty@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => 2, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "paty@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
  end

  it "creating a course" do
    post "#{url}.json", {
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
    get "#{url}.json"

    post_json = JSON.parse last_response.body
    expect(post_json.length).to eq 1
  end

  it "should get only instructor's courses" do
    user = User.create({:email => "instructor@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => 1, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "instructor@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"

    instructor = FactoryGirl.create(:user, :profile => 1)
    FactoryGirl.create(:course, :available => true, :instructor_id => user[:id])
    FactoryGirl.create(:course, :available => false, :instructor_id => instructor[:id])
    get "#{url}.json"

    post_json = JSON.parse last_response.body
    expect(post_json.length).to eq 1
  end
end
