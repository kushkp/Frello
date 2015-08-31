Rails.application.routes.draw do
  root to: "root#root"

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]

  namespace :api, defaults: { format: :json } do
    resources :boards, except: [:new, :edit]
    resources :lists, only: [:index, :show, :create, :destroy, :update]
    resources :cards, only: [:index, :show, :create, :destroy, :update]
  end
end
