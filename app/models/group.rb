class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    last_message = messages.last

    return 'まだメッセージはありません' unless last_message.present?
    last_message.content? ? last_message.content : '画像が投稿されています'
  end
end
