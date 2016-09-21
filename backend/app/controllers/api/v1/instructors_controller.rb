class Api::V1::InstructorsController < ApplicationController
  PROFILE_INSTRUCTOR = 3
  before_filter :authenticate_request!
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @instructors = User.where(profile: PROFILE_INSTRUCTOR)
    respond_with(@instructors)
  end

  def show
    respond_with(@user)
  end

  def create
    user = User.create(user_params)
    if user.valid?
      UserMailer.new_instructor(user).deliver_now
      respond_with(user, :location => api_v1_instructor_path(user))
    else
      respond_with(user)
    end
  end

  def update
    @user.update(user_params)
    if @user.valid?
      UserMailer.edit_instructor(@user).deliver_now
      respond_with(@user, :location => api_v1_instructor_path(@user))
    else
      respond_with(@user)
    end
  end

  def destroy
    @user.destroy
    respond_with(true)
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      user = params.require(:instructor).permit(:name, :email, :gender, :birthday)
      user["profile"] = PROFILE_INSTRUCTOR
      user["password"] = (1..6).map { (rand(8)+1).to_s}.join
      user
    end
end
