create table users (
  user_id serial primary key,
  auth_id text,
  user_name varchar(35),
  user_pic text,
  bio text
);