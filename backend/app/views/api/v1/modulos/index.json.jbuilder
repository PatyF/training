json.modulos @course.modulos do |modulo|
  json.id modulo.id
  json.course_id modulo.course_id
  json.title modulo.title
  json.description modulo.description
  if @current_user.profile == User::PROFILE_STUDENT
    json.watched_videos modulo.watched_videos? @current_user
  end
end
