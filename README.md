## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text|devise, null: false, index: true|
|mail|text|devise|
|password|string|devise|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|text||

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|string|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
