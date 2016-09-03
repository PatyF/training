class Api::V1::VideosController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo
  before_action :set_video, only: [:show, :edit, :update, :destroy]

  def index
    respond_with(@modulo.videos)
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
