json.comments @comments do |comment|
  json.comment comment.comment
  json.grade comment.grade
  json.user_id comment.user_id
  json.user_name User.where(id: comment.user_id).first.name
end
