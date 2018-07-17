insert into posts (post_title, post_content, tags, user_id)
values ($1, $2, $3, $4)
returning *;