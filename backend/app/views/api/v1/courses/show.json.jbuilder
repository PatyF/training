json.course do
  json.id @course.id
  json.name @course.name
  json.keywords @course.keywords
  json.instructor_id @course.instructor_id
  json.available @course.available
  json.categories @course.categories
  if @current_user.profile == User::PROFILE_STUDENT
    json.number_videos @course.number_videos
    json.watched_videos @course.watched_videos @current_user
    json.number_activities @course.number_activities
    json.answered_activities @course.answered_activities @current_user
    json.grade @course.grade @current_user
    json.generate_certificate @course.generate_certificate @current_user
  end
end
