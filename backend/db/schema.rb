# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160926213100) do

  create_table "activities", force: :cascade do |t|
    t.integer  "modulo_id",          limit: 4
    t.string   "question",           limit: 255
    t.string   "correct_answer",     limit: 255
    t.string   "incorrect_answer_1", limit: 255
    t.string   "incorrect_answer_2", limit: 255
    t.string   "incorrect_answer_3", limit: 255
    t.string   "incorrect_answer_4", limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "activities", ["modulo_id"], name: "index_activities_on_modulo_id", using: :btree

  create_table "categories", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "categories_courses", id: false, force: :cascade do |t|
    t.integer "course_id",   limit: 4
    t.integer "category_id", limit: 4
  end

  add_index "categories_courses", ["category_id"], name: "index_categories_courses_on_category_id", using: :btree
  add_index "categories_courses", ["course_id"], name: "index_categories_courses_on_course_id", using: :btree

  create_table "courses", force: :cascade do |t|
    t.string   "name",          limit: 255
    t.string   "keywords",      limit: 255
    t.boolean  "available",     limit: 1
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "instructor_id", limit: 4
  end

  add_index "courses", ["instructor_id"], name: "index_courses_on_instructor_id", using: :btree

  create_table "modulos", force: :cascade do |t|
    t.integer  "course_id",   limit: 4
    t.string   "title",       limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "modulos", ["course_id"], name: "index_modulos_on_course_id", using: :btree

  create_table "registries", force: :cascade do |t|
    t.integer  "course_id",    limit: 4
    t.integer  "user_id",      limit: 4
    t.date     "initial_date"
    t.date     "final_date"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "registries", ["course_id"], name: "index_registries_on_course_id", using: :btree
  add_index "registries", ["user_id"], name: "index_registries_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "name",                   limit: 255, default: "", null: false
    t.integer  "gender",                 limit: 4,   default: 0,  null: false
    t.integer  "profile",                limit: 4,   default: 0,  null: false
    t.date     "birthday",                                        null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "videos", force: :cascade do |t|
    t.integer  "modulo_id",   limit: 4
    t.string   "title",       limit: 255
    t.string   "link",        limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "videos", ["modulo_id"], name: "index_videos_on_modulo_id", using: :btree

end
