class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.mailer.subject
  #
  def new_user(user)
    @user = user
    mail(to: user.email, subject: "Seu login Knap")
  end

  def edit_user(user)
    @user = user
    mail(to: user.email, subject: "Seu login Knap")
  end
end
