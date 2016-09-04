class Api::V1::UsersController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    users = User.all
    respond_with(users)
  end

  def students
    @students = User.where(profile: 2)
    respond_with(@students)
  end

  def instructors
    @instructors = User.where(profile: 1)
    respond_with(@instructors)
  end

  def show
    respond_with(@user)
  end

  def create
    user = User.create(user_params)

    if user.valid?
      respond_with(user, :location => api_v1_user_path(user))
    else
      respond_with(user)
    end
  end

  def update
    @user.update(user_params)
    if @user.valid?
      respond_with(@user, :location => api_v1_user_path(@user))
    else
      respond_with(@user)
    end
  end

  def destroy
    @user.destroy
    respond_with()
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :email, :gender, :birthday, :profile, :password, :password_confirmation)
    end
end
