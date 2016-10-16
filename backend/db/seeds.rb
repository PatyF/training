# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

courses = Course.create([{ name: 'Gestão de Negócios', keywords: 'negocios;gestao', workload: '12', available: false }])
Modulo.create([{ course: courses.first, title: 'Introdução', description: 'Como fazer uma introdução se tornar memorável e tão atraente que irá incentivar o leitor a continuar lendo seu texto, independente do tema?' }])
User.create([{name: 'Patricia', email: 'p.computacao@gmail.com', gender: 'F', password: '123456', profile: 0, birthday: '1989-09-22'}])
