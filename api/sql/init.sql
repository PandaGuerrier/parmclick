CREATE TABLE `users` (
                         `uuid` CHAR(36) NOT NULL,
                         `email` VARCHAR(255) NOT NULL,
                         `name` VARCHAR(100) NOT NULL,
                         `password` VARCHAR(255) NOT NULL,
                         `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         PRIMARY KEY (`uuid`),
                         UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;