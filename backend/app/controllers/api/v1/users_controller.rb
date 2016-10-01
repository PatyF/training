class Api::V1::UsersController < ApplicationController
  before_filter :authenticate_request!

  def profile
    respond_with(@current_user)
  end
end
