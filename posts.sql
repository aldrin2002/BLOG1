-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2024 at 08:32 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `filepath` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `title`, `content`, `status`, `created_at`, `updated_at`, `created_by`, `user_id`, `filepath`) VALUES
(8, '4th testing', 'kaya ko toh!', 'published', '2024-07-27 08:10:46', '2024-07-27 08:10:46', 'aldrin', 7, ''),
(9, '5th testing', 'post is working and yet my get is not! send help', 'published', '2024-07-27 16:13:45', '2024-07-27 16:13:45', 'aldrin', 7, ''),
(10, '6th testing', 'hahahahaha', 'published', '2024-07-28 03:25:48', '2024-07-28 03:25:48', 'aldrin', 7, ''),
(11, '7th testing ', 'HAHAHAHAHA', 'published', '2024-07-28 03:28:35', '2024-07-28 03:28:35', 'aldrin', 7, ''),
(12, '35 Facts About Olongapo', 'Olongapo, located on the beautiful island of Luzon in the Philippines, is a city that boasts a rich history, vibrant culture, and breathtaking natural beauty. From its humble beginnings as a fishing village to its transformation into a bustling urban center, Olongapo has become a popular destination for locals and tourists alike. In this article, we will delve into 35 fascinating facts about Olongapo that will shed light on its intriguing past, highlight its must-visit attractions, and showcase the unique charm that sets it apart from other cities in the country. So, get ready to embark on a virtual tour of Olongapo and discover the hidden gems that make this city truly unforgettable.', 'published', '2024-07-28 04:49:23', '2024-07-28 04:49:23', 'aldrin', 7, ''),
(16, 'YEY FINALLY IT FINISHED ALL THE CRUD METHODS!!!', 'addpost,getpost,deletepost and updatePost are working finally!!!', 'published', '2024-07-28 09:28:33', '2024-07-28 10:39:31', 'aldrin', 7, ''),
(19, 'last & final test of system', 'AT LAST, THE SYSTEM IS FINISHED!', 'published', '2024-07-28 16:03:35', '2024-07-28 16:03:35', 'aldrin', 7, ''),
(20, 'Martin Fallls - Tabacuhan Sta. Rita, Olongapo City', 'Finally, we had the chance to see the hidden waterfalls of Tabacuhan in Sta. Rita, Olongapo City.  Martin Falls is new to us considering we\'ve been living in this city for a long time.  It is located on a mountain ranges between Gordon Heights, Tabacuhan, and Old Cabalan (we don\'t know the name of the mountain though).  The opposite side of this waterfalls lies the Mampueng Falls, it was great that we come to find not only one waterfall in the city!', 'published', '2024-07-28 16:41:51', '2024-07-28 16:41:51', 'alwin', 8, ''),
(21, 'Capistrano Falls - The Twin Waterfalls of Olongapo City', 'It was a good yet special Sunday when my friends and I decided to do something aggressive, vigorous and fun, then all of a sudden we talked about Christian\'s hike at Talisayin Cove and Larry\'s trip to some waterfalls around our locale. Of course, I have had my own journey but not as exciting as they have had. Then we finally decided to go to one of the most hidden waterfalls in Olongapo City, probably five to seven kilometers away from the city proper.', 'published', '2024-07-28 16:44:25', '2024-07-28 16:44:25', 'alwin', 8, ''),
(22, 'testing last', 'HAHAHAHAHA', 'published', '2024-07-28 17:49:48', '2024-07-28 17:49:48', 'aldrin', 7, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_tbl` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
