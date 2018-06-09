Rails.application.routes.draw do
  devise_for :installs
  root 'groups#index'

  devise_for :users
  resources :products
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:edit, :update]
  resources :messages, only: [:index, :create]
end
