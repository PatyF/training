require 'rails_helper'
require './app/controllers/api/v1/courses_controller'

RSpec.describe Api::V1::CoursesController, type: :api do
  let(:url) { "api/v1/courses.json" }

  before do
    @user = User.create({:email => "paty@knap.com", :name => "Patricia", :birthday => "1989-09-22", :profile => User::PROFILE_STUDENT, :password => "password", :password_confirmation => "password"})
    post "auth_user", {:email => "paty@knap.com", :password => "password"}
    post_json = JSON.parse last_response.body
    header "Authorization", "Bearer #{post_json["auth_token"]}"
  end

  it "creating a course" do
    post "#{url}", {
      :name => "Tutorial",
    	:keywords => "keyword",
      :workload => 13
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

  it "should return the number of questions answered" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    modulo_2 = FactoryGirl.create(:modulo, :course_id => course.id)
    activity_1 = FactoryGirl.create(:activity, :modulo_id => modulo_1.id)
    activity_2 = FactoryGirl.create(:activity, :modulo_id => modulo_1.id)
    activity_3 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    FactoryGirl.create(:answer, :activity_id => activity_1.id, :user_id => @user.id, :answer_student => 1)
    FactoryGirl.create(:answer, :activity_id => activity_2.id, :user_id => @user.id, :answer_student => nil)
    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["number_activities"]).to eq 3
    expect(post_json["course"]["answered_activities"]).to eq 1
  end

  it "should return the number of questions answered" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    modulo_2 = FactoryGirl.create(:modulo, :course_id => course.id)
    video_1 = FactoryGirl.create(:video, :modulo_id => modulo_1.id)
    video_2 = FactoryGirl.create(:video, :modulo_id => modulo_1.id)
    video_3 = FactoryGirl.create(:video, :modulo_id => modulo_2.id)
    FactoryGirl.create(:position, :video_id => video_1.id, :user_id => @user.id, :watched => true)
    FactoryGirl.create(:position, :video_id => video_2.id, :user_id => @user.id, :watched => nil)
    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["number_videos"]).to eq 3
    expect(post_json["course"]["watched_videos"]).to eq 1
  end

  it "should return the student's grade" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    modulo_2 = FactoryGirl.create(:modulo, :course_id => course.id)
    activity_1 = FactoryGirl.create(:activity, :modulo_id => modulo_1.id)
    activity_2 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    activity_3 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    activity_4 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    FactoryGirl.create(:answer, :activity_id => activity_1.id, :user_id => @user.id, :answer_student => 1)
    FactoryGirl.create(:answer, :activity_id => activity_2.id, :user_id => @user.id, :answer_student => 0)
    FactoryGirl.create(:answer, :activity_id => activity_3.id, :user_id => @user.id, :answer_student => nil)

    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["grade"]).to eq 25
  end

  it "should return false if don't watched all videos" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    FactoryGirl.create(:video, :modulo_id => modulo_1.id)

    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["generate_certificate"]).to eq false
  end

  it "should return false if the grade is less than 70" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    modulo_2 = FactoryGirl.create(:modulo, :course_id => course.id)
    activity_1 = FactoryGirl.create(:activity, :modulo_id => modulo_1.id)
    activity_2 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    activity_3 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    activity_4 = FactoryGirl.create(:activity, :modulo_id => modulo_2.id)
    FactoryGirl.create(:answer, :activity_id => activity_1.id, :user_id => @user.id, :answer_student => 1)
    FactoryGirl.create(:answer, :activity_id => activity_2.id, :user_id => @user.id, :answer_student => 0)
    FactoryGirl.create(:answer, :activity_id => activity_3.id, :user_id => @user.id, :answer_student => nil)
    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["generate_certificate"]).to eq false
  end

  it "should return true if the grade is greater than 70" do
    course = FactoryGirl.create(:course, :available => true)
    modulo_1 = FactoryGirl.create(:modulo, :course_id => course.id)
    activity_1 = FactoryGirl.create(:activity, :modulo_id => modulo_1.id)
    FactoryGirl.create(:answer, :activity_id => activity_1.id, :user_id => @user.id, :answer_student => 0)
    video_1 = FactoryGirl.create(:video, :modulo_id => modulo_1.id)
    FactoryGirl.create(:position, :video_id => video_1.id, :user_id => @user.id, :watched => true)
    get "api/v1/courses/#{course.id}.json"

    post_json = JSON.parse last_response.body
    expect(post_json["course"]["generate_certificate"]).to eq true
  end
end
