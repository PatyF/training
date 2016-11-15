json.students @registries do |student|
  json.name User.where(id: student.user_id).first.name
  json.user_id student.user_id
  json.number_videos @course.number_videos
  json.watched_videos @course.watched_videos User.where(id: student.user_id).first
  json.number_activities @course.number_activities
  json.answered_activities @course.answered_activities User.where(id: student.user_id).first
  json.grade @course.grade User.where(id: student.user_id).first
  json.final_date student.final_date ? student.final_date.strftime("%d/%m/%Y") : nil 
end
