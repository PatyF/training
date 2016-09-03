class Api::V1::CoursesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course, only: [:show, :edit, :update, :destroy]

  def index
    courses = Course.all
    respond_with(courses)
  end

  def show
    respond_with(@course)
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

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.require(:course).permit(:name, :keywords, :available)
    end
end
