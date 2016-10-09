json.course do
  json.id @course.id
  json.name @course.name
  json.keywords @course.keywords
  json.instructor_id @course.instructor_id
  json.available @course.available
  json.categories @course.categories
end
