create table posts (
  id serial primary key,
  title varchar(35),
  content text,
  user_id integer references users (id)
);