create table posts (
  id serial primary key,
  title varchar(35),
  content text,
  tags text[],
  created_at timestamp default now(),
  updated_at timestamp default now(),
  user_id integer references users (id)
);