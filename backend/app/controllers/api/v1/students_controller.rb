class Api::V1::StudentsController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @students = User.where(profile: 2)
    respond_with(@students)
  end

  def show
    respond_with(@user)
  end

  def create
    user = User.create(user_params)
    if user.valid?
      UserMailer.new_user(user).deliver_now
      respond_with(user, :location => api_v1_student_path(user))
    else
      respond_with(user)
    end
  end

  def update
    @user.update(user_params)
    if @user.valid?
      UserMailer.edit_user(@user).deliver_now
      respond_with(@user, :location => api_v1_student_path(@user))
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
      user = params.require(:student).permit(:name, :email, :gender, :birthday)
      user["profile"] = 2
      user["password"] = (1..6).map { (rand(8)+1).to_s}.join
      user
    end
end
