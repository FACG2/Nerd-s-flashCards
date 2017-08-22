BEGIN ;
DROP TABLE IF EXISTS users , topics , cards ,card_likes CASCADE ;
CREATE TABLE  users (
id SERIAL PRIMARY KEY NOT NULL ,
name VARCHAR(100) NOT NULL,
usaname VARCHAR(100) NOT NULL,
password  VARCHAR(100) NOT NULL

);

CREATE TABLE  topics (
id SERIAL PRIMARY KEY NOT NULL ,
title VARCHAR(100) NOT NULL,
status BOOLEAN NOT NULL,
user_id SERIAL REFERENCES users(id)
         ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE  cards (
id SERIAL PRIMARY KEY NOT NULL ,
content text NOT NULL,
likes integer,
topics_id SERIAL REFERENCES topics(id)
         ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE  topic_likes (
id SERIAL PRIMARY KEY NOT NULL ,
likes integer,
user_id SERIAL REFERENCES users(id)
         ON UPDATE CASCADE ON DELETE CASCADE ,
 topics_id SERIAL REFERENCES topics(id)
         ON UPDATE CASCADE ON DELETE CASCADE

);
INSERT INTO users (name,usaname,password) VALUES
('Qamer','Qamer93','123456'),
('Mahmmoud','Mahmmoud96','123456'),
('Ghadeer','Ghadeer93','123456');
INSERT INTO topics (title,status,user_id) VALUES
('Qamer',true,1),
('Mahmmoud',false,2),
('Ghadeer',false,3);

INSERT INTO cards (content,likes,topics_id) VALUES
('qqqqqqqqqqqqqqqq',9,1),
('MahmmoudMahmmoud',5,2),
('GHDEERGHDEERGHDR',7,3);

INSERT INTO topic_likes (likes,user_id,topics_id) VALUES
(9,1,1),
(5,2,2),
(5,3,3);

COMMIT ;
