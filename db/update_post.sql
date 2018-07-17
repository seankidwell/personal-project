update posts
set post_title = $1, post_content = $2, tags = $3
where id = $4;