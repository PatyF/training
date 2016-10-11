class Api::V1::VideosController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo
  before_action :set_video, only: [:show, :edit, :update, :destroy, :get_position_video, :position_video]

  def index
    @modulo.videos
  end

  def show
    respond_with(@video)
  end

  def create
    video = @modulo.videos.create(video_params)

    if video.valid?
      respond_with(video, :location => api_v1_course_modulo_video_path(@course, @modulo, video))
    else
      respond_with(video)
    end
  end

  def update
    @video.update(video_params)
    if @video.valid?
      respond_with(@video, :location => api_v1_course_modulo_video_path(@course, @modulo, @video))
    else
      respond_with(@video)
    end
  end

  def destroy
    @modulo.destroy
    respond_with()
  end

  def get_position_video
    respond_with(@video.positions.where(user_id: @current_user.id))
  end

  def position_video
    @position = @video.positions.where(user_id: @current_user.id).first
    if (!@position)
      @position = @video.positions.create(
        video_id: @video.id,
        user_id: @current_user.id,
        position: params["position"],
        duration: params["duration"],
        watched: params["watched"])
      return respond_with(@position, :location => api_v1_course_modulo_video_path(@course, @modulo, @video))
    else
      @position.update(
        position: params["position"],
        duration: params["duration"],
        watched: (params["watched"] || @position.watched))
      return respond_with(@position, :location => api_v1_course_modulo_video_path(@course, @modulo, @video))
    end
  end

  private
    def set_course
      @course = Course.find(params['course_id'])
    end

    def set_modulo
      @modulo = @course.modulos.find(params['modulo_id'])
    end

    def set_video
      @video = @modulo.videos.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:modulo_id, :title, :description, :link)
    end
end
