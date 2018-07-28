select *, posts.user_id as the_user_id from posts
join users on users.user_id = posts.user_id
join comments on posts.post_id = comments.post_id
where comments.user_id = $1
order by posts.post_id;