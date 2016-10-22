json.grades @registries do |registry|
  json.id registry.course_id
  json.name Course::where(id: registry.course_id).first.name
  json.initial_date registry.initial_date.strftime("%d/%m/%Y")
  json.final_date registry.final_date.strftime("%d/%m/%Y")
  json.number_videos Course::where(id: registry.course_id).first.number_videos
  json.watched_videos Course::where(id: registry.course_id).first.watched_videos User.where(id: registry.user_id).first
  json.number_activities Course::where(id: registry.course_id).first.number_activities
  json.answered_activities Course::where(id: registry.course_id).first.answered_activities User.where(id: registry.user_id).first
  json.grade Course::where(id: registry.course_id).first.grade User.where(id: registry.user_id).first
end
