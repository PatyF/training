class Api::V1::CoursesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course, only: [:show, :edit, :update, :destroy, :have_registry, :registry]

  def index
    if @current_user.profile == User::PROFILE_STUDENT
      courses = Course.where(available: true)
    elsif @current_user.profile == User::PROFILE_INSTRUCTOR
      courses = Course.where(instructor_id: @current_user.id)
    else
      courses = Course.all
    end
    respond_with(courses)
  end

  def show
    @course
  end

  def create
    course = Course.create(course_params)
    if course.valid?
      respond_with(course, :location => api_v1_course_path(course))
    else
      respond_with(course)
    end
  end

  def update
    @course.update(course_params)
    if @course.valid?
      respond_with(@course, :location => api_v1_course_path(@course))
    else
      respond_with(@course)
    end
  end

  def destroy
    @course.destroy
    respond_with()
  end

  def have_registry
    respond_with(@course.registries.where(user_id: @current_user.id))
  end

  def registry
    @registry = @course.registries.where(user_id: @current_user.id).first
    if (!@registry)
      @registry = @course.registries.create(course_id: @course.id, user_id: @current_user.id, initial_date: Date.today.to_time)
    end
    respond_with(@registry, :location => api_v1_course_path(@course))
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.permit(:name, :keywords, :available, :instructor_id, category_ids: [])
    end
end
