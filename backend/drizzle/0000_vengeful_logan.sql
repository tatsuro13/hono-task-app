CREATE TABLE `tasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
