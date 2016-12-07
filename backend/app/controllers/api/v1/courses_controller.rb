class Api::V1::CoursesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course, only: [:show, :edit, :update, :destroy, :have_registry, :registry, :certified, :have_comment, :comment, :comments, :students]

  def index
    if @current_user.profile == User::PROFILE_STUDENT
      @index_courses = Course.where(available: true)
    elsif @current_user.profile == User::PROFILE_INSTRUCTOR
      @index_courses = Course.where(instructor_id: @current_user.id)
    else
      @index_courses = Course.all
    end
    @index_courses
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
    was_available = @course.available
    @course.update(course_params)
    if @course.valid?
      if was_available == false && @course.available == true
        send_new_course
      end
      respond_with(@course, :location => api_v1_course_path(@course))
    else
      respond_with(@course)
    end
  end

  def send_new_course
    @users = User.where(profile: User::PROFILE_STUDENT)
    @users.find_each do |student|
      UserMailer.new_course(@course, student).deliver_now
    end
  end

  def destroy
    @course.destroy
    respond_with()
  end

  def have_registry
    respond_with(@course.registries.where(user_id: @current_user.id).first)
  end

  def registry
    @registry = @course.registries.where(user_id: @current_user.id).first
    if (!@registry)
      @registry = @course.registries.create(course_id: @course.id, user_id: @current_user.id, initial_date: Date.today.to_time)
    end
    respond_with(@registry, :location => api_v1_course_path(@course))
  end

  def certified
    @registry = @course.registries.where(user_id: @current_user.id).first
    if (@registry)
      name_file = "certified_#{@course.id}_#{@current_user.id}.pdf"

      web_auth = DropboxOAuth2FlowNoRedirect.new(ENV['USER_STORAGE'], ENV['PASSWORD_STORAGE'])
      authorize_url = web_auth.start()
      client = DropboxClient.new(ENV['AUTH_STORAGE'])

      if (!@registry.final_date)
        @registry.update(final_date: Date.today.to_time)
        pdf = WickedPdf.new.pdf_from_string(render_to_string("certifieds/show.html.erb", layout: false))
        entry = client.put_file(name_file, pdf)
      end

      out,metadata = client.get_file_and_metadata("/#{name_file}")
      send_data out.force_encoding('BINARY'), :filename => name_file, :type => "application/pdf", :disposition => "attachment"
    end
  end

  def have_comment
    @comment = @course.comments.where(user_id: @current_user.id).first
    respond_with(@comment, :location => api_v1_course_path(@course))
  end

  def comment
    @comment = @course.comments.where(user_id: @current_user.id).first
    if (!@comment)
      @comment = @course.comments.create(course_id: @course.id, user_id: @current_user.id, grade: params[:grade], comment: params[:comment])
    end
    respond_with(@comment, :location => api_v1_course_path(@course))
  end

  def comments
    @comments = @course.comments
    @comments
  end

  def students
    @registries = @course.registries
    @registries
  end

  private
    def set_course
      @course = Course.find(params[:id])
    end

    def course_params
      params.permit(:name, :keywords, :description, :available, :instructor_id, :workload, category_ids: [])
    end
end
