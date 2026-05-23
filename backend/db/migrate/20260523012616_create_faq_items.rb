class CreateFaqItems < ActiveRecord::Migration[8.1]
  def change
    create_table :faq_items do |t|
      t.string :question
      t.string :response
      t.integer :order
      t.boolean :actif

      t.timestamps
    end
  end
end
