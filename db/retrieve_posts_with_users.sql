select * from posts
join users on posts.user_id=users.user_id
order by post_id;