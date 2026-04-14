let seats = [];
let selectedPrice = 250;

// INIT SEATS (ALWAYS RESET SO NOTHING LOOKS BOOKED)
function initSeats() {
    seats = [];

    for (let i = 1; i <= 50; i++) {
        seats.push({
            seat_number: "A" + i,
            status: "available"
        });
    }

    saveSeats();
}

// SAVE
function saveSeats() {
    localStorage.setItem("cinemaSeats", JSON.stringify(seats));
}

// LOAD (FROM MEMORY OR RESET)
function loadSavedSeats() {
    let saved = localStorage.getItem("cinemaSeats");

    if (saved) {
        seats = JSON.parse(saved);
    } else {
        initSeats();
    }
}

// MOVIE CHANGE
function changeMovie() {
    let value = document.getElementById("movieSelect").value;
    let parts = value.split("|");

    selectedPrice = parseInt(parts[1]);

    document.getElementById("priceDisplay").innerText =
        "Price: \u20B1" + selectedPrice;

    updateTotal();
}

// DISPLAY SEATS
function loadSeats() {
    const container = document.getElementById("seats");
    container.innerHTML = "";

    seats.forEach((seat, index) => {
        const div = document.createElement("div");
        div.className = "seat";

        if (seat.status === "booked") {
            div.classList.add("booked");
        }

        div.textContent = seat.seat_number;

        div.onclick = function () {
            if (seat.status === "booked") return;

            seats[index].status = "booked";
            saveSeats();
            loadSeats();
            updateTotal();
        };

        container.appendChild(div);
    });
}

// TOTAL PRICE
function updateTotal() {
    let booked = seats.filter(s => s.status === "booked").length;
    let total = booked * selectedPrice;

    document.getElementById("total").innerText =
        "Total: \u20B1" + total;
}

// RESET BUTTON
function resetSeats() {
    seats.forEach(s => s.status = "available");
    saveSeats();
    loadSeats();
    updateTotal();
}

// START APP
loadSavedSeats();
loadSeats();
updateTotal();