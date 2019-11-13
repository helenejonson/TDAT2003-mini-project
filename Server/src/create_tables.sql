DROP TABLE IF EXISTS annonse;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS category;

create table annonse(
id integer not null auto_increment,
title varchar(100) not null,
picturePath varchar(250) not null,
pictureAlt varchar(100) not null,
pictureCapt varchar(100) not null,
text varchar(21000) not null,
date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
author varchar(50) not null,
category varchar(30) not null,
importance smallint not null,
likes integer NOT NULL DEFAULT '0',
dislikes integer NOT NULL DEFAULT '0',
PRIMARY KEY (id)
);

create table comments(
commentId integer not null auto_increment,
articleId integer not null,
username varchar (50) not null,
text varchar(1000) not null,
date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (commentId)
);

create table category(
categoryId integer not null auto_increment,
name varchar(30) not null,
description varchar (50) not null,
primary key (categoryId)
);

