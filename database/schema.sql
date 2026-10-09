-- ========================================================
-- Event Registration System - MySQL Database Schema
-- Database Name: event_registration_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `event_registration_db`;
USE `event_registration_db`;

-- --------------------------------------------------------
-- Table Structure: users
-- --------------------------------------------------------
DROP TABLE IF EXISTS `registrations`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'user',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table Structure: events
-- --------------------------------------------------------
CREATE TABLE `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `venue` VARCHAR(255) NOT NULL,
  `organizer` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `max_participants` INT NOT NULL DEFAULT 50,
  `registration_deadline` VARCHAR(100) NOT NULL,
  `image` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table Structure: registrations
-- --------------------------------------------------------
CREATE TABLE `registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `event_id` INT NOT NULL,
  `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(50) NOT NULL DEFAULT 'Confirmed',
  UNIQUE KEY `unique_user_event` (`user_id`, `event_id`),
  CONSTRAINT `fk_registrations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_registrations_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ========================================================
-- SAMPLE SEED DATA
-- Passwords below are hashed using bcrypt (Password: admin123 and user123)
-- Admin: admin@eventhub.com / admin123
-- Users: john@example.com / user123, sarah@example.com / user123, alex@example.com / user123
-- ========================================================

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Admin User', 'admin@eventhub.com', '$2a$10$wT/tWkY4d9n1F7HpxLxgxeO4M5E98S5Y2c.k103D3P5D3P5D3P5D3', 'admin'),
(2, 'John Doe', 'john@example.com', '$2a$10$wT/tWkY4d9n1F7HpxLxgxeO4M5E98S5Y2c.k103D3P5D3P5D3P5D3', 'user'),
(3, 'Sarah Smith', 'sarah@example.com', '$2a$10$wT/tWkY4d9n1F7HpxLxgxeO4M5E98S5Y2c.k103D3P5D3P5D3P5D3', 'user'),
(4, 'Alex Johnson', 'alex@example.com', '$2a$10$wT/tWkY4d9n1F7HpxLxgxeO4M5E98S5Y2c.k103D3P5D3P5D3P5D3', 'user');

INSERT INTO `events` (`id`, `title`, `description`, `date`, `time`, `venue`, `organizer`, `category`, `max_participants`, `registration_deadline`, `image`) VALUES
(1, 'Tech Innovations Summit 2026', 'Join top tech leaders, engineers, and visionaries for a day of inspiring talks on Artificial Intelligence, Cloud Computing, and modern web architectures.', '2026-11-15', '09:00 AM - 05:00 PM', 'Grand Auditorium, Tech Park', 'School of Computer Science', 'Technology', 100, '2026-11-10T23:59', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'),
(2, 'Campus Music & Arts Festival', 'Experience live music performances from student bands, art exhibitions, food trucks, and interactive workshops in this annual celebration.', '2026-10-25', '04:00 PM - 10:00 PM', 'Central Campus Lawn', 'Cultural Affairs Committee', 'Arts & Music', 250, '2026-10-24T18:00', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'),
(3, 'AI & Hackathon 24-Hour Code Sprint', 'Build innovative solutions, collaborate with teammates, win exciting cash prizes, and showcase your developer skills to industry mentors.', '2026-12-05', '10:00 AM - 10:00 AM (Next Day)', 'Innovation Lab, Block B', 'Developer Student Club', 'Coding', 60, '2026-12-01T23:59', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'),
(4, 'Entrepreneurship & Startup Workshop', 'Learn how to validate ideas, pitch to venture capitalists, build financial models, and launch your startup from experienced entrepreneurs.', '2026-10-30', '02:00 PM - 06:00 PM', 'Seminar Hall 3', 'Incubation Center', 'Business', 40, '2026-10-28T20:00', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'),
(5, 'UI/UX Design Masterclass', 'Master modern visual design systems, component libraries, typography, color theory, and prototyping techniques using Figma.', '2026-11-02', '10:00 AM - 01:00 PM', 'Design Studio, Media Block', 'Department of Design', 'Design', 30, '2026-11-01T12:00', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80');

INSERT INTO `registrations` (`user_id`, `event_id`, `registration_date`, `status`) VALUES
(2, 1, '2026-10-01 10:30:00', 'Confirmed'),
(2, 3, '2026-10-02 14:15:00', 'Confirmed'),
(3, 1, '2026-10-03 09:00:00', 'Confirmed'),
(4, 2, '2026-10-04 11:45:00', 'Confirmed');
