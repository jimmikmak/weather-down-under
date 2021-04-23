class CreateBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookmarks do |t|
      t.string :city
      t.string :country
      t.string :weather
    end
  end
end
