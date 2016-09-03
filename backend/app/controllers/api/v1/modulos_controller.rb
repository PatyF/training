class Api::V1::ModulosController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo, only: [:show, :edit, :update, :destroy]

  def index
    respond_with(@course.modulos)
  end

  def show
    respond_with(@modulo)
  end

  def create
    modulo = @course.modulos.create(modulo_params)

    if modulo.valid?
      respond_with(modulo, :location => api_v1_course_modulo_path(@course, modulo))
    else
      respond_with(modulo)
    end
  end

  def update
    @modulo.update(modulo_params)
    if @modulo.valid?
      respond_with(@modulo, :location => api_v1_course_modulo_path(@course, @modulo))
    else
      respond_with(@modulo)
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
      @modulo = @course.modulos.find(params[:id])
    end

    def modulo_params
      params.require(:modulo).permit(:course_id, :title, :description )
    end
end
