Rails.application.routes.draw do
  # root '/index.html'
  get '/' => 'static_pages#index'
  post 'auth_user' => 'authentication#authenticate_user'
  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'profile' => 'users#profile'
      resources :students
      resources :instructors
      resources :categories

      resources :courses do
        resources :modulos do
          resources :videos
          resources :activities
          resources :documents
        end
      end

      get 'courses/:id/registry' => 'courses#have_registry'
      post 'courses/:id/registry' => 'courses#registry'
      get 'courses/:id/certified' => 'courses#certified'
      get 'courses/:id/comment' => 'courses#have_comment'
      post 'courses/:id/comment' => 'courses#comment'
      get 'courses/:id/comments' => 'courses#comments'
      get 'courses/:id/students' => 'courses#students'
      get 'students/:id/grades' => 'students#grades'

      get 'courses/:course_id/modulos/:modulo_id/activities/:id/question_student' => 'activities#question_from_student'
      post 'courses/:course_id/modulos/:modulo_id/activities/:id/answer_student' => 'activities#answer_from_student'
      get 'courses/:course_id/modulos/:modulo_id/videos/:id/position_video' => 'videos#get_position_video'
      post 'courses/:course_id/modulos/:modulo_id/videos/:id/position_video' => 'videos#position_video'
      get 'courses/:course_id/modulos/:modulo_id/documents/:id/download' => 'documents#download'

    end
  end
  get '*path' => redirect('/')
  # get 'certifieds' => 'certifieds#show'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
