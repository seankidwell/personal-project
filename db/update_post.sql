update posts
set post_title = $1, post_content = $2, tags = $3, post_updated_at = now()
where post_id = $4;