insert into users (auth_id, user_name, user_pic)
values ($1, $2, $3)
returning *;