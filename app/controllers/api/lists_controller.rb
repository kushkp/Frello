class Api::ListsController < ApplicationController
  def create
    @list = List.new(list_params)
    if @list.save
      render :index
    else
      render @list.errors.full_messages
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy!
    render :index
  end

  def index
    @lists = List.all.order(:ord)
    render :index
  end

  def show
    @list = List.find(params[:id])
  end

  def update

    @list = List.find(params[:id])
    if @list.update(list_params)
      render :show
    else
      render @list.errors.full_messages
    end

  end

  private
    def list_params
      params.require(:list).permit(:title, :board_id, :ord)
    end
end
