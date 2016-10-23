class Api::V1::DocumentsController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_course
  before_action :set_modulo
  before_action :set_document, only: [:show, :edit, :update, :destroy, :download]

  def index
    @modulo.documents
  end

  def show
    respond_with(@document)
  end

  def create
    document = @modulo.documents.create(name: params['fileName'])

    if document.valid?
      save_path = File.join Rails.root.join('storage')
      FileUtils.mkdir_p(save_path) unless File.exist?(save_path)
      save_path  = File.join Rails.root.join('storage/documents')
      FileUtils.mkdir_p(save_path) unless File.exist?(save_path)

      File.open(File.join(save_path, "#{document.id}"), 'wb') do |file|
        file.write(params['file'].read)
      end
      respond_with(document, :location => api_v1_course_modulo_document_path(@course, @modulo, document))
    else
      respond_with(document)
    end
  end

  def destroy
    @document.destroy
    respond_with()
  end

  def download
    name_file = @document.name
    save_path = File.join Rails.root.join('storage/documents')
    File.open(File.join(save_path, "#{@document.id}"), 'r') do |f|
      send_data f.read.force_encoding('BINARY'), :filename => name_file, :type => "application/pdf", :disposition => "attachment"
    end
  end

  private
    def set_course
      @course = Course.find(params['course_id'])
    end

    def set_modulo
      @modulo = @course.modulos.find(params['modulo_id'])
    end

    def set_document
      @document = @modulo.documents.find(params[:id])
    end

    def document_params
      params.require(:document).permit(
        :modulo_id,
        :name)
    end
end
