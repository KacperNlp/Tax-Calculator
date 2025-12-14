CREATE TABLE `calculations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_name` text NOT NULL,
	`net_amount` real NOT NULL,
	`currency` text NOT NULL,
	`vat_rate` text NOT NULL,
	`gross_amount` real NOT NULL,
	`tax_amount` real NOT NULL,
	`ip` text NOT NULL,
	`created_at` text NOT NULL
);
