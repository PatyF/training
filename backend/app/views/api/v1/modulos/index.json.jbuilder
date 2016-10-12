json.modulos @course.modulos do |modulo|
  json.id modulo.id
  json.course_id modulo.course_id
  json.title modulo.title
  json.description modulo.description
  if @current_user.profile == User::PROFILE_STUDENT
    json.number_videos modulo.number_videos
    json.watched_videos modulo.watched_videos @current_user
    json.number_activities modulo.number_activities
    json.answered_activities modulo.answered_activities @current_user
  end
end
