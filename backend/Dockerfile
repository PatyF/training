FROM ruby:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev mysql-client nodejs
RUN mkdir /opt/training
WORKDIR /opt/training
ADD Gemfile /opt/training/Gemfile
ADD Gemfile.lock /opt/training/Gemfile.lock
RUN bundle install
ADD . /opt/training
