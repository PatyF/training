class Api::V1::CategoriesController < ApplicationController
  before_filter :authenticate_request!
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    categories = Category.all
    respond_with(categories)
  end

  def show
    respond_with(@category)
  end

  def create
    category = Category.create(category_params)

    if category.valid?
      respond_with(category, :location => api_v1_category_path(category))
    else
      respond_with(category)
    end
  end

  def update
    @category.update(category_params)
    if @category.valid?
      respond_with(@category, :location => api_v1_category_path(@category))
    else
      respond_with(@category)
    end
  end

  def destroy
    @category.destroy
    respond_with()
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
