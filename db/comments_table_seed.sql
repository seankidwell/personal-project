create table comments (
  comment_id serial primary key,
  comment_content text,
  comment_created_at timestamp default now(),
  comment_updated_at timestamp default now(),
  user_id integer references users (user_id),
  post_id integer references posts (post_id)
);