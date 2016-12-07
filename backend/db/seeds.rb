# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

courses = Course.create([{ name: 'Gestão de Negócios', keywords: 'negocios;gestao', workload: '12', available: false }])
Modulo.create([{ course: courses.first, title: 'Introdução', description: 'Como fazer uma introdução se tornar memorável e tão atraente que irá incentivar o leitor a continuar lendo seu texto, independente do tema?' }])
User.create([{name: 'Administrador', email: 'admin@knap.com', gender: 'F', password: '123456', profile: 0, birthday: '1989-01-21'}])
User.create([{name: 'Instrutor 1', email: 'instrutor1@knap.com', gender: 'F', password: '123456', profile: 1, birthday: '1989-01-21'}])
User.create([{name: 'Instrutor 2', email: 'instrutor2@knap.com', gender: 'F', password: '123456', profile: 1, birthday: '1989-01-21'}])
User.create([{name: 'Aluno 1', email: 'aluno1@knap.com', gender: 'F', password: '123456', profile: 2, birthday: '1989-01-21'}])
User.create([{name: 'Aluno 2', email: 'aluno2@knap.com', gender: 'F', password: '123456', profile: 2, birthday: '1989-01-21'}])
User.create([{name: 'Aluno 3', email: 'aluno3@knap.com', gender: 'F', password: '123456', profile: 2, birthday: '1989-01-21'}])
