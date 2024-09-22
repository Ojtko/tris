/*TWORZENIE BAZY DANYCH*/
DROP DATABASE IF EXISTS `OjtkoTris`;
CREATE DATABASE `OjtkoTris`;
USE `OjtkoTris`;

/*TWORZENIE TABEL*/
CREATE TABLE `user` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `email`  VARCHAR(30),
    `nick` VARCHAR(30),
    `pass` VARCHAR(255),
    `exp` INT(30) DEFAULT 0,
    `credits` INT(30) DEFAULT 0
    );