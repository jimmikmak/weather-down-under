class User < ApplicationRecord
  has_secure_password
  has_many :bookmarks

  validates :name, uniqueness: { message: 'User already exists' }
end