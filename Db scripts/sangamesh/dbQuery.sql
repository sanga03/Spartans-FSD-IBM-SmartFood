create database spartans;
use spartans;
select * from customer_account ;
select * from customer_account;
delete from  physical_detail where customer_account_id=1;
select * from physical_detail;
show tables;
delete from customer_account where id=26;
desc basic_ingredent;
select * from basic_ingredent;
delete from  basic_ingredent where id=3;
drop table basic_ingredent;
select * from userpreferences;
select * from customer_account;
drop table userpreferences;
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

select * from userprefcuisines;
drop table userprefcuisines;
