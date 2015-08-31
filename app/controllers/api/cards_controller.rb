class Api::CardsController < ApplicationController
  def create
    @card = Card.new(card_params)
    if @card.save
      render :index
    else
      render @card.errors.full_messages
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy!
    render :index
  end

  def index
    @cards = Card.where(list_id: params[:list_id])
    render :index
  end

  def show
    @card = Card.find(params[:id])
    render json: @card
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      render json: @card
    else
      render @card.errors.full_messages
    end
  end

  private
    def card_params
      params.require(:card).permit(:title, :list_id, :ord)
    end
end
