function startRide() {
    const employee = document.getElementById("employeeName").value;
    const startLocation = document.getElementById("startLocation").value;
    const endLocation = document.getElementById("endLocation").value;
    const carNumber = document.getElementById("carNumber").value;
    const startTime = new Date().toLocaleTimeString();

    if (!employee) {
        alert("Please select an employee name.");
        return;
    }

    fetch("http://localhost:3000/startRide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeName: employee, startLocation, endLocation, carNumber, startTime })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("rideStatus").innerText = "Ride Started...";
        document.getElementById("startTime").innerText = `Start Time: ${startTime}`;
        localStorage.setItem("rideId", data.rideId); // Store ride ID for ending the ride
    });
}

function endRide() {
    const rideId = localStorage.getItem("rideId");
    if (!rideId) {
        alert("Start the ride first.");
        return;
    }

    const endTime = new Date().toLocaleTimeString();
    const distance = Math.floor(Math.random() * 50) + 1;

    fetch("http://localhost:3000/endRide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rideId, endTime, distance })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("rideStatus").innerText = "Ride Ended";
        document.getElementById("distance").innerText = `Distance: ${distance} km`;
        document.getElementById("endTime").innerText = `End Time: ${endTime}`;
    });
}