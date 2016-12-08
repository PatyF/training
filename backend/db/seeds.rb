# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create([{name: 'Administrador', email: 'admin@knap.com', gender: 'F', password: '123456', profile: 0, birthday: '1989-01-21'}])
User.create([{name: 'Albus Dumbledore', email: 'albus@knap.com', gender: 'M', password: '123456', profile: 1, birthday: '1989-01-21'}])
User.create([{name: 'Minerva McGonagall', email: 'minerva@knap.com', gender: 'F', password: '123456', profile: 1, birthday: '1989-01-21'}])
User.create([{name: 'Severo Snape', email: 'snape@knap.com', gender: 'M', password: '123456', profile: 1, birthday: '1989-01-21'}])
User.create([{name: 'Harry James Potter', email: 'harry@knap.com', gender: 'M', password: '123456', profile: 2, birthday: '1989-01-21'}])
User.create([{name: 'Ronald Weasley', email: 'ronald@knap.com', gender: 'M', password: '123456', profile: 2, birthday: '1989-01-21'}])
User.create([{name: 'Hermione Granger', email: 'hermione@knap.com', gender: 'F', password: '123456', profile: 2, birthday: '1989-01-21'}])
User.create([{name: 'Luna Lovegood', email: 'luna@knap.com', gender: 'F', password: '123456', profile: 2, birthday: '1989-01-21'}])
