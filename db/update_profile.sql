update users
set user_name = $1, bio = $2
where user_id = $3;