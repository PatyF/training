require 'rails_helper'

RSpec.describe CoursesController, type: :api do
  let(:url) { "courses" }

  it "criando um post" do
		# método HTTP sobre a URL especificada
		post "#{url}.json",  :course => {
      :name => "Tutorial",
			:keywords => "keyword"
		}

		post_json = JSON.parse last_response.body

		# Id deve vir populado
		expect(post_json["id"]).to be
		expect(last_response.status).to eq(201)
	end

end
