json.videos @modulo.videos do |video|
  json.id video.id
  json.modulo_id video.modulo_id
  json.title video.title
  json.link video.link
  json.description video.description
  if @current_user.profile == User::PROFILE_STUDENT
    if video.positions.where(user_id: @current_user.id).count > 0
      json.watched video.positions.where(user_id: @current_user.id).first.watched
    end
  end
end
