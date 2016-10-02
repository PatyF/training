class Api::V1::ActivitiesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo
  before_action :set_activity, only: [:show, :edit, :update, :destroy, :question_from_student, :answer_from_student]

  def index
    respond_with(@modulo.activities)
  end

  def show
    respond_with(@activity)
  end

  def create
    activity = @modulo.activities.create(activity_params)

    if activity.valid?
      respond_with(activity, :location => api_v1_course_modulo_activity_path(@course, @modulo, activity))
    else
      respond_with(activity)
    end
  end

  def update
    @activity.update(activity_params)
    if @activity.valid?
      respond_with(@activity, :location => api_v1_course_modulo_activity_path(@course, @modulo, @activity))
    else
      respond_with(@activity)
    end
  end

  def destroy
    @modulo.destroy
    respond_with()
  end

  def question_from_student
    @question = @activity.answers.where(user_id: @current_user.id).first
    if (!@question)
      shuffle_answers = (0..4).to_a.shuffle!
      @question = @activity.answers.create(
        activity_id: @activity.id,
        user_id: @current_user.id,
        answer_a: shuffle_answers[0],
        answer_b: shuffle_answers[1],
        answer_c: shuffle_answers[2],
        answer_d: shuffle_answers[3],
        answer_e: shuffle_answers[4])
    end
    respond_with(@activity.builder_question(@current_user).target!)
  end

  def answer_from_student
    @question = @activity.answers.where(user_id: @current_user.id).first
    @question.update(answer_student: @activity.get_id_answer(@current_user, params.require(:answer_student)))
    respond_with(@activity.builder_question(@current_user).target!, :location => api_v1_course_modulo_activity_path(@course, @modulo, @activity))
  end

  private
    def set_course
      @course = Course.find(params['course_id'])
    end

    def set_modulo
      @modulo = @course.modulos.find(params['modulo_id'])
    end

    def set_activity
      @activity = @modulo.activities.find(params[:id])
    end

    def activity_params
      params.require(:activity).permit(
        :modulo_id,
        :question,
        :correct_answer,
        :incorrect_answer_1,
        :incorrect_answer_2,
        :incorrect_answer_3,
        :incorrect_answer_4)
    end
end
