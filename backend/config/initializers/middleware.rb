Rails.configuration.middleware.tap do |middleware|
  middleware.delete ActionDispatch::Cookies
  middleware.delete ActionDispatch::Flash
  middleware.delete ActionDispatch::Session::CookieStore
  middleware.delete ActionDispatch::Static
  middleware.delete Rack::MethodOverride
end
