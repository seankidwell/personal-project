create table posts (
  post_id serial primary key,
  post_title varchar(35),
  post_content text,
  tags text[],
  post_created_at timestamp default now(),
  post_updated_at timestamp default now(),
  user_id integer references users (user_id)
);