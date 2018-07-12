create table comments (
  id serial primary key,
  content text,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  user_id integer references users (id),
  post_id integer references posts (id),
);