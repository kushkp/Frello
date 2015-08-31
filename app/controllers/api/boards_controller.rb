class Api::BoardsController < ApplicationController
  def create
    @board = Board.new(board_params)
    @board.user_id = current_user.id

    if @board.save!
      render :show
    else
      render @board.errors.full_messages
    end
  end

  def update
    @board = Board.find(params[:id])

    if @board.update_attributes(board_params)
      render :show
    else
      render @board.errors.full_messages
    end
  end

  def show
    @board = Board.find(params[:id])
  end

  def index
    @boards = Board.all
    render :index
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy!
    render :index
  end

private
  def board_params
    params.require(:board).permit(:title)
  end
end
