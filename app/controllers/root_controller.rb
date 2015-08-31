class RootController < ApplicationController
  def root
    if logged_in?
      render :root
    else
      redirect_to new_session_url
    end
  end
end
