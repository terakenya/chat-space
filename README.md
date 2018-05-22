## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|text||
|mail|text||
|password|integer|null: false|

### Association
- has_many :groups
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text||

### Association
- has_many :users
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|message|string|
|image|string|

### Association
- belongs_to :group
- belongs_to :user
