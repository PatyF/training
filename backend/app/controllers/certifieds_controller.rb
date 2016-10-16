  class CertifiedsController < ApplicationController
    def show
      pdf = WickedPdf.new.pdf_from_string(render_to_string("certifieds/show.html.erb", layout: false))
      send_data(pdf, :filename => "resume.pdf", :type => "application/pdf", :disposition => "attachment")
    end
  end
