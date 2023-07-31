CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` int NOT NULL,
  `vacation_id` int DEFAULT NULL,
  KEY `userID_idx` (`vacation_id`),
  KEY `holidayID_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (2,13),(2,17),(2,34),(2,15),(2,3),(2,9),(3,3),(3,9),(3,12),(3,14),(3,1),(3,16),(3,15),(6,5),(6,18),(6,15),(4,1),(4,9),(4,8),(4,14),(4,18),(4,16),(4,5),(5,1),(5,8),(5,5),(5,12),(5,13),(5,18),(5,16),(5,15),(6,3),(6,9),(6,10),(6,11),(6,13);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `siteusers`
--

DROP TABLE IF EXISTS `siteusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `siteusers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_create` varchar(45) NOT NULL,
  `role` varchar(45) DEFAULT 'member',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `siteusers`
--

LOCK TABLES `siteusers` WRITE;
/*!40000 ALTER TABLE `siteusers` DISABLE KEYS */;
INSERT INTO `siteusers` VALUES (1,'admin','admin','admin@admin.com','admin','28.7.2023   ,   9:55:50','admin'),(2,'eden','siotkovetsky','eden@gmail.com','eden','28.7.2023   ,   9:55:54','member'),(3,'user','user','user@user.com','user','28.7.2023   ,   9:56:22','member'),(4,'another user','anothwer user ','user2@user.com','user','28.7.2023   ,   9:56:45','member'),(5,'another another user','user 3','user3@gmail.com','user','28.7.2023   ,   9:57:50','member'),(6,'elon','musk ','elon@gmail.com','1234','30.7.2023   ,   12:45:48','member');
/*!40000 ALTER TABLE `siteusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vac`
--

DROP TABLE IF EXISTS `vac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vac` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `start_date` varchar(45) NOT NULL,
  `end_date` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `followers_count` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vac`
--

LOCK TABLES `vac` WRITE;
/*!40000 ALTER TABLE `vac` DISABLE KEYS */;
INSERT INTO `vac` VALUES (1,'Bali, Indonesia ','Tropical Tranquility Nestled amidst the Indonesian archipelago, Bali beckons travelers with its postcard-perfect beaches, emerald rice terraces, and a serene spiritual ambiance. Explore ancient temples like Uluwatu and Tanah Lot, indulge in Balinese dance performances, and immerse yourself in the islands vibrant culture. From the vibrant streets of Seminyak to the peaceful shores of Nusa Dua, Bali offers an ideal blend of relaxation and adventure. Engage in water sports, pamper yourself at luxurious resorts, and witness breathtaking sunsets over the Indian Ocean, making this vacation an unforgettable tropical paradise.','2023-07-21','2023-07-28','299','BALI.jpg','3'),(3,'Rome, Italy ','Cultural Odyssey: Rome, the eternal city, captivates travelers with its unparalleled history and artistic treasures. Stroll through the Roman Forum, marvel at the Colosseums grandeur, and visit Vatican City to witness Michelangelos masterpiece in the Sistine Chapel. Indulge in delectable pasta, gelato, and espresso at charming trattorias. Meander through cobbled streets, throw a coin into the Trevi Fountain, and immerse yourself in the Italian way of life. Romes blend of ancient wonders and modern allure promises an enriching cultural experience like no other.','2023-07-28','2023-08-10','389','rome.jpg','3'),(5,'Bora Bora','An epitome of paradise, Bora Bora is an idyllic island surrounded by a radiant turquoise lagoon and vibrant coral reefs. Stay in overwater bungalows, snorkel with colorful marine life, and unwind on pristine beaches, offering the perfect escape from the hustle and bustle of modern life.','2023-07-30','2023-08-09','345','bora.jpg','3'),(8,'Cape Town, South Africa','Perched at the southern tip of Africa, Cape Town offers a delightful blend of stunning landscapes, diverse cultures, and a rich history. Hike up Table Mountain for panoramic views, visit the vibrant Bo-Kaap neighborhood, and explore the nearby Cape Winelands for exceptional wines and scenic vineyards.','2023-08-01','2023-08-09','280','cape-town.jpg','2'),(9,'New York City, USA','The iconic city that never sleeps, New York City is a pulsating metropolis packed with world-famous landmarks, Broadway shows, and an unrivaled cultural scene. From the Statue of Liberty to Central Park and Times Square, the citys energy is infectious and promises an unforgettable experience.','2023-08-29','2023-09-08','399','nyc.jpg','4'),(10,'Kyoto, Japan','Transport yourself back in time to the cultural heart of Japan – Kyoto. This city is a harmonious blend of traditional temples, meticulously manicured gardens, and elegant geisha culture. Take a serene stroll through bamboo forests, admire cherry blossoms in bloom, and immerse yourself in the tranquility of Zen Buddhism.','2023-07-18','2023-07-25','320','kyoto.jpg','1'),(11,'Machu Picchu, Peru','Hidden high in the Andes Mountains, Machu Picchu is an enigmatic Incan citadel that leaves visitors in awe. The majestic stone structures are set against a dramatic backdrop of lush mountains, offering an incredible view into the ancient civilizations engineering prowess and spiritual significance.','2023-09-30','2023-10-09','289','machu.jpg','1'),(12,'Venice, Italy','A city of romance and enchantment, Venice is a network of picturesque canals and historic architecture. Glide along the Grand Canal in a gondola, visit the iconic St. Marks Square and basilica, and get lost in the labyrinthine alleys, where every corner holds a surprise.','2023-07-31','2023-08-05','239','venice.jpg','2'),(13,'Amsterdam, Netherlands','An enchanting city of canals, bicycles, and rich history, Amsterdam beckons with its picturesque beauty and vibrant culture. Explore world-class museums like the Rijksmuseum and Van Gogh Museum, wander through charming neighborhoods, and experience the Dutch way of life in this charming European capital.','2023-07-14','2023-08-28','314','amsterdam.jpg','3'),(14,'maldives','Comprising over 1,000 coral islands, the Maldives is a dreamy tropical paradise in the Indian Ocean. Its crystal-clear turquoise waters, white sandy beaches, and luxurious overwater bungalows create an idyllic setting for romance and relaxation. Dive into the underwater wonderland to encounter vibrant coral reefs and marine life.','2023-08-20','2023-09-01','399','maldive.jpg','2'),(15,'Paris, France','Paris, the City of Lights, is synonymous with romance, art, and culture. Explore world-class museums such as the Louvre and Musee dOrsay, take a leisurely cruise along the Seine River, and marvel at the iconic Eiffel Tower. Paris charm lies in its quaint streets, charming cafes, and timeless elegance.','2023-07-31','2023-08-05','275','paris.jpg','4'),(16,'Cairo, Egypt','Cairo, the bustling capital of Egypt, is a city steeped in history and ancient wonders. Visit the awe-inspiring Pyramids of Giza, explore the Egyptian Museum, and take a stroll through the medieval Islamic quarter. Cairo offers a fascinating glimpse into Egypts rich past and vibrant present.','2023-08-11','2023-08-19','309','cairo.jpg','3'),(17,'Sydney, Australia:','Sydney, with its iconic Opera House and Harbor Bridge, is a vibrant city that combines modernity with natural beauty. Relax at Bondi Beach, explore the historic Rocks area, and take a harbor cruise to admire the citys skyline. Sydneys laid-back lifestyle and sunny climate make it an inviting destination.','2023-08-09','2023-08-19','315','sydney.jpg','1'),(18,'Barcelona, Spain','Barcelona is a vibrant city that blends art, architecture, and Mediterranean charm. Visit the architectural marvels of Antoni Gaudí, including the Sagrada Família and Park Güell. Stroll along the lively La Rambla, indulge in delicious tapas, and soak in the citys lively atmosphere. Barcelonas unique blend of modernist and Gothic architecture creates an unforgettable urban landscape.','2023-08-19','2023-08-28','209','barcelona.jpg','3');
/*!40000 ALTER TABLE `vac` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-31 23:28:30
