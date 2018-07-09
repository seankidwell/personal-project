create table comments (
  id serial primary key,
  content text,
  user_id integer references users (id),
  posts_id integer references posts (id)
);