CREATE DATABASE transport_db;
USE transport_db;

CREATE TABLE rides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255),
    start_location VARCHAR(255),
    end_location VARCHAR(255),
    car_number VARCHAR(50),
    start_time VARCHAR(50),
    end_time VARCHAR(50),
    distance FLOAT
);