require 'dropbox_sdk'

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

      web_auth = DropboxOAuth2FlowNoRedirect.new(ENV['USER_STORAGE'], ENV['PASSWORD_STORAGE'])
      authorize_url = web_auth.start()
      client = DropboxClient.new(ENV['AUTH_STORAGE'])

      entry = client.put_file(document.id.to_s, params['file'].read)
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
    web_auth = DropboxOAuth2FlowNoRedirect.new(ENV['USER_STORAGE'], ENV['PASSWORD_STORAGE'])
    authorize_url = web_auth.start()
    @client = DropboxClient.new(ENV['AUTH_STORAGE'])

    out,metadata = @client.get_file_and_metadata("/#{@document.id}")
    send_data out.force_encoding('BINARY'), :filename => name_file, :type => "application/pdf", :disposition => "attachment"
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
