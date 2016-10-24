class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.mailer.subject
  #
  def new_student(user)
    @user = user
    mail(to: user.email, subject: "[Knap] Novo login")
  end

  def edit_student(user)
    @user = user
    mail(to: user.email, subject: "[Knap] Login alterado")
  end

  def new_instructor(user)
    @user = user
    mail(to: user.email, subject: "[Knap] Novo login")
  end

  def edit_instructor(user)
    @user = user
    mail(to: user.email, subject: "[Knap] Login alterado")
  end

  def new_course(course, user)
    @course = course
    @user = user
    mail(to: @user.email, subject: "[Knap] Novo curso disponível")
  end
end
