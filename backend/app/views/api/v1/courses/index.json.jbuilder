json.courses @index_courses do |course|
  json.id course.id
  json.name course.name
  json.keywords course.keywords
  json.instructor_id course.instructor_id
  json.workload course.workload
  json.available course.available
  json.average_grades course.average_grades
  json.categories course.categories.map {|category| category.id}
end
