-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2023 at 03:59 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pweb_a`
--

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `form_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`form_id`, `user_id`, `judul`, `deskripsi`, `created_at`, `updated_at`) VALUES
(26, 4, 'Tugas APM', 'Silahkan upload file tugas anda yang berformat pdf', '2023-06-26 13:09:37', '2023-06-26 13:09:37'),
(27, 4, 'Tugas Proses Bisnis', 'Silahkan submit tugas anda', '2023-06-26 13:10:55', '2023-06-26 13:10:55'),
(28, 11, 'Form kepuasan terhadap jurusan', 'Silahkan submit file yang telah diisi', '2023-06-26 13:55:29', '2023-06-26 13:55:29'),
(29, 11, 'Tugas PSE', 'Silahkan upload tugas anda', '2023-06-26 13:56:43', '2023-06-26 13:56:43');

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `user_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `uploaded_file` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`user_id`, `form_id`, `uploaded_file`, `description`, `created_at`, `updated_at`) VALUES
(4, 26, '1687785170030_579-File Utama Naskah-2417-1-10-20221004.pdf', 'nama :Dzul Fauzi\r\nnim : 2011522001', '2023-06-26 13:12:50', '2023-06-26 13:12:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(4, 'Dzul Fauzi', 'dzulfauzi2@gmail.com', '$2a$08$cReJauMscbMwXthYPX1ATOklUXZiLYtM3ogCpivZJjLXAuF8fbvpi', '2023-06-26 13:28:19', '2023-06-26 13:49:15'),
(7, 'khalil', 'khalilamir2371@gmail.com', '$2a$08$OA/ZYJwi/Ov6dksGuXD6z.FURUog1eyXu3S8eRWSlSHIG1rAdhuyq', '2023-06-26 13:28:19', '2023-06-26 13:28:19'),
(9, 'Wahyu', 'wahyu@gmail.com', '$2a$08$A6pOxUGjgdRANf6mx9zU7erwV2pHRNMbwzUc25rurUE3MASuTHxSi', '2023-06-26 13:28:19', '2023-06-26 13:28:19'),
(10, 'Ilham', 'ilham@gmail.com', '$2a$08$MWqda7B64ae3U51fm8kNwusgVknKpEQWIeD3tkS53pURY0xP4Qq12', '2023-06-26 13:37:23', '2023-06-26 13:37:23'),
(11, 'Imam', 'imam@gmail.com', '$2a$08$KaKI1unPDGvs2cUohXdLleboyk7eaolh9b3x64gY9TIbW3AJVouYu', '2023-06-26 13:52:35', '2023-06-26 13:52:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD KEY `user_id` (`user_id`,`form_id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `forms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submission`
--
ALTER TABLE `submission`
  ADD CONSTRAINT `submission_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `submission_ibfk_2` FOREIGN KEY (`form_id`) REFERENCES `forms` (`form_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
