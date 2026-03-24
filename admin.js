// =========================
// LOAD DATA FROM STORAGE
// =========================
let events = JSON.parse(localStorage.getItem("events")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// =========================
// DOM ELEMENTS
// =========================
const form = document.getElementById("eventForm");
const table = document.getElementById("eventTable");
const bookingTable = document.getElementById("bookingTable");
const totalEvents = document.getElementById("totalEvents");
const totalBookings = document.getElementById("totalBookings");

// =========================
// ADD EVENT
// =========================
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const price = document.getElementById("ticketPrice").value;
    const qty = document.getElementById("ticketQty").value;

    const event = { name, date, price, qty };

    events.push(event);

    // SAVE TO STORAGE
    localStorage.setItem("events", JSON.stringify(events));

    renderEvents();
    form.reset();
});

// =========================
// RENDER EVENTS
// =========================
function renderEvents() {
    table.innerHTML = "";

    events.forEach((event, index) => {
        table.innerHTML += `
            <tr>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>₹${event.price}</td>
                <td>${event.qty}</td>
                <td>
                    <button onclick="deleteEvent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });

    totalEvents.innerText = events.length;
}

// =========================
// DELETE EVENT
// =========================
function deleteEvent(index) {
    events.splice(index, 1);

    // UPDATE STORAGE
    localStorage.setItem("events", JSON.stringify(events));

    renderEvents();
}

// =========================
// RENDER BOOKINGS
// =========================
function renderBookings() {
    bookingTable.innerHTML = "";

    bookings.forEach((b) => {
        bookingTable.innerHTML += `
            <tr>
                <td>${b.user}</td>
                <td>${b.event}</td>
                <td>${b.tickets}</td>
                <td>₹${b.amount}</td>
                <td>${b.date}</td>
                <td>${b.time}</td>
                <td>${b.day}</td>
            </tr>
        `;
    });

    totalBookings.innerText = bookings.length;
}

// =========================
// INITIAL LOAD
// =========================
renderEvents();
renderBookings();