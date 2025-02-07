const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "transport_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected!");
});

// API to store ride data
app.post("/startRide", (req, res) => {
    const { employeeName, startLocation, endLocation, carNumber, startTime } = req.body;
    const sql = "INSERT INTO rides (employee_name, start_location, end_location, car_number, start_time) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [employeeName, startLocation, endLocation, carNumber, startTime], (err, result) => {
        if (err) throw err;
        res.send({ message: "Ride Started", rideId: result.insertId });
    });
});

app.post("/endRide", (req, res) => {
    const { rideId, endTime, distance } = req.body;
    const sql = "UPDATE rides SET end_time = ?, distance = ? WHERE id = ?";
    
    db.query(sql, [endTime, distance, rideId], (err, result) => {
        if (err) throw err;
        res.send({ message: "Ride Ended" });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));