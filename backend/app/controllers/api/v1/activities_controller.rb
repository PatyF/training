class Api::V1::ActivitiesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo
  before_action :set_activity, only: [:show, :edit, :update, :destroy]

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
