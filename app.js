// =========================
// LOAD DATA
// =========================
let events = JSON.parse(localStorage.getItem("events")) || [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

// =========================
// DOM ELEMENTS
// =========================
const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const bookingTable = document.getElementById("bookingTable");

// =========================
// ADD EVENT
// =========================
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const event = {
        id: Date.now(),
        name: document.getElementById("eventName").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        location: document.getElementById("location").value,
        price: parseInt(document.getElementById("price").value),
        quantity: parseInt(document.getElementById("quantity").value)
    };

    events.push(event);

    // SAVE EVENTS
    localStorage.setItem("events", JSON.stringify(events));

    form.reset();
    renderEvents();
});

// =========================
// RENDER EVENTS
// =========================
function renderEvents() {
    eventList.innerHTML = "";

    events.forEach(event => {

        if (event.quantity <= 0) return;

        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} | ${event.time}</p>
            <p>${event.location}</p>
            <p>Price: ₹${event.price}</p>
            <p>Tickets Left: ${event.quantity}</p>
            
            <input type="text" id="user_${event.id}" placeholder="Your Name">
            <input type="number" id="ticket_${event.id}" placeholder="Tickets">
            
            <button onclick="bookTicket(${event.id})">Book</button>
            <button onclick="deleteEvent(${event.id})" style="background:red;margin-left:5px;">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

// =========================
// BOOK TICKET
// =========================
function bookTicket(id) {
    const event = events.find(e => e.id === id);

    const user = document.getElementById(`user_${id}`).value;
    const tickets = parseInt(document.getElementById(`ticket_${id}`).value);

    if (!user || !tickets || tickets <= 0) {
        alert("Enter valid booking details");
        return;
    }

    if (tickets > event.quantity) {
        alert("Not enough tickets");
        return;
    }

    event.quantity -= tickets;

    const dayName = new Date(event.date)
        .toLocaleDateString('en-IN', { weekday: 'long' });

    // TIME FORMAT
    let [hours, minutes] = event.time.split(":");
    hours = parseInt(hours);

    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    let formattedTime = hours + ":" + minutes + " " + ampm;

    bookings.push({
        user: user,
        event: event.name,
        tickets: tickets,
        amount: tickets * event.price,
        date: event.date,
        time: formattedTime,
        day: dayName
    });

    // SAVE BOTH
    localStorage.setItem("bookings", JSON.stringify(bookings));
    localStorage.setItem("events", JSON.stringify(events));

    // REMOVE EVENT IF SOLD OUT
    if (event.quantity <= 0) {
        events = events.filter(e => e.id !== id);
        localStorage.setItem("events", JSON.stringify(events));
    }

    renderEvents();
    renderBookings();
}

// =========================
// DELETE EVENT
// =========================
function deleteEvent(id) {
    events = events.filter(e => e.id !== id);

    localStorage.setItem("events", JSON.stringify(events));

    renderEvents();
}

// =========================
// RENDER BOOKINGS
// =========================
function renderBookings() {
    bookingTable.innerHTML = "";

    bookings.forEach(b => {
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
}

// =========================
// INITIAL LOAD
// =========================
renderEvents();
renderBookings();