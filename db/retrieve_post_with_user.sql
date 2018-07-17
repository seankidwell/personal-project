select * from posts
join users on posts.user_id=users.user_id
where posts.post_id = $1;