json.activities @modulo.activities do |activity|
  json.id activity.id
  json.question activity.question
  if @current_user.profile == User::PROFILE_STUDENT
    if activity.answers.where(user_id: @current_user.id).count > 0
      if activity.answers.where(user_id: @current_user.id).first.answer_student != nil
         json.correct_answer activity.answers.where(user_id: @current_user.id).first.answer_student == 0
      end
    end
  end
end
