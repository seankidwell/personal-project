create table users (
  user_id serial primary key,
  auth_id text,
  user_name varchar(35),
  password text,
  user_pic text
);