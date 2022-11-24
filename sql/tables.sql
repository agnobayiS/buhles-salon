-- Table create scripts here

create table client (
	id serial not null primary key,
	first_name text not null,
    last_name text not null,
    phone_number int not null
);

create table treatment (
	id serial not null primary key,
	type text not null,
    code text not null,
    price decimal(10,2)

);
create table style (
	id serial not null primary key,
	first_name text not null,
    last_name text not null,
    phone_number int not null,
    commision_percentage decimal (3,2)
);

create table booking (
	id serial not null primary key,
	booking_date Date not null,
    booking_time  time not null,
    client_id int not null,
    treatment_id int not null,
    stylist_id int not null,
    foreign key (client_id) references client(id),
    foreign key (treatment_id) references treatment(id),
    foreign key (stylist_id) references style(id)
);





-- Add insert scripts here
insert into treatment (type,code,price) values ('Pedicure','ped',175);
insert into treatment (type,code,price) values ('Manicure','man',215);
insert into treatment (type,code,price) values ('Make up','mak',185.00);
insert into treatment (type,code,price) values ('Brows & Lashes','bro',240.00);


insert into client (first_name,last_name,phone_number) values ('siyabonga','mpani',0727654321);
insert into client (first_name,last_name,phone_number) values ('tso','mtshokotsha',0811234215);
insert into client (first_name,last_name,phone_number) values ('Makho' ,'sandile',0800567800);
insert into client (first_name,last_name,phone_number) values ('tabang','mento',0210987654);
insert into client (first_name,last_name,phone_number) values ('cara','tuna',0110987654);
insert into client (first_name,last_name,phone_number) values ('andre','vermuela',0510987654);
insert into client (first_name,last_name,phone_number) values ('athi','zazaza',0430987654);

insert into style (first_name,last_name,phone_number,commision_percentage) values ('siya','zazaza',0727654321,0.71);
insert into style (first_name,last_name,phone_number,commision_percentage) values ('tsoman','msholi',0811234215,0.81);
insert into style (first_name,last_name,phone_number,commision_percentage) values ('Makhosandile' ,'mento',0800567800,0.91);
insert into style (first_name,last_name,phone_number,commision_percentage) values ('tabo','thabang',0210987654,1.10);

