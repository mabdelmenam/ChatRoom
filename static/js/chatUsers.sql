USE chatroom;

DROP TABLE IF EXISTS chatusers;

CREATE table chatUsers(
    id int NOT NULL AUTO_INCREMENT,   
	username VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

SELECT * FROM `chatusers` ORDER BY `chatusers`.`id` ASC;