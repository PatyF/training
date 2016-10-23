class Document < ActiveRecord::Base
  validates :name, presence: true, length: { minimum:3 }
  belongs_to :modulo
end
