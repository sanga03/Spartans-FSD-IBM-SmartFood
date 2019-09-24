create database spartans;
use spartans;


select * from userpreferences;

CREATE TABLE userpreferences (id int PRIMARY KEY AUTO_INCREMENT
,category int,
target_weight float
,u_uuid varchar(255) unique not null 
,upr_uuid varchar(255));

drop table cuisines;
create table userprefcuisines(id int PRIMARY KEY AUTO_INCREMENT,
cuisine varchar(255),
user_preferences_id int,u_uuid varchar(255) unique not null,
Foreign Key (user_preferences_id) references  userpreferences(id) on delete cascade );


