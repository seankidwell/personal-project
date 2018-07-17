select * from comments
join users on comments.user_id=users.user_id
where comments.post_id = $1;