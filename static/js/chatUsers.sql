USE chatroom;

DROP TABLE IF EXISTS chatusers;

CREATE table chatUsers(
    id int NOT NULL AUTO_INCREMENT,   
	username VARCHAR(16) NOT NULL UNIQUE,
    PRIMARY KEY(id)
);

SELECT * FROM `chatusers` ORDER BY `chatusers`.`id` ASC;


/*

To fix numbering in first Column with id.


ALTER TABLE chatusers DROP COLUMN id;

ALTER TABLE chatusers ADD COLUMN `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT FIRST;


*/