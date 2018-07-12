select * from comments
where comments.post_id = $1
order by id desc;