insert into posts (title, content, tags, user_id)
values ($1, $2, $3, $4)
returning *;