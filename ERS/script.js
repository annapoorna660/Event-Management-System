let events = [
    {
        id: 1,
        name: "Web Development Workshop",
        date: "2026-10-10",
        time: "10:00",
        venue: "Computer Science Lab",
        description: "Learn HTML, CSS and JavaScript."
    },
    {
        id: 2,
        name: "AI & Machine Learning Seminar",
        date: "2026-10-18",
        time: "11:00",
        venue: "Main Auditorium",
        description: "Learn about Artificial Intelligence and Machine Learning."
    },
    {
        id: 3,
        name: "College Coding Contest",
        date: "2026-11-02",
        time: "09:30",
        venue: "Innovation Center",
        description: "Test your programming and problem-solving skills."
    }
];

function displayEvents() {
    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events available.</p>";
        return;
    }

    events.forEach(function(event) {
        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.name}</h3>

            <p>
                <strong>Date:</strong>
                ${event.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${event.time}
            </p>

            <p>
                <strong>Venue:</strong>
                ${event.venue}
            </p>

            <p>
                ${event.description}
            </p>

            <button onclick="registerEvent(${event.id})">
                Register
            </button>

            <button class="edit-btn"
                    onclick="editEvent(${event.id})">
                Edit
            </button>

            <button class="delete-btn"
                    onclick="deleteEvent(${event.id})">
                Delete
            </button>
        `;

        eventList.appendChild(card);
    });
}

document.getElementById("eventForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("eventId").value;
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const venue = document.getElementById("eventVenue").value;
    const description = document.getElementById("eventDescription").value;

    if (id !== "") {

        const existingEvent =
            events.find(function(item) {
                return item.id == id;
            });

        existingEvent.name = name;
        existingEvent.date = date;
        existingEvent.time = time;
        existingEvent.venue = venue;
        existingEvent.description = description;

        alert("Event updated successfully!");

    } else {

        const newEvent = {
            id: Date.now(),
            name: name,
            date: date,
            time: time,
            venue: venue,
            description: description
        };

        events.push(newEvent);

        alert("Event created successfully!");
    }

    displayEvents();
    resetForm();
});

function editEvent(id) {

    const event =
        events.find(function(item) {
            return item.id === id;
        });

    if (!event) {
        return;
    }

    document.getElementById("eventId").value = event.id;
    document.getElementById("eventName").value = event.name;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("eventTime").value = event.time;
    document.getElementById("eventVenue").value = event.venue;
    document.getElementById("eventDescription").value = event.description;

    document.getElementById("formTitle")
        .textContent = "Edit Event";

    document.getElementById("submitButton")
        .textContent = "Update Event";

    document.getElementById("create")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function deleteEvent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) {
        return;
    }

    events = events.filter(function(event) {
        return event.id !== id;
    });

    displayEvents();

    alert("Event deleted successfully!");
}

function registerEvent(id) {

    const event =
        events.find(function(item) {
            return item.id === id;
        });

    if (!event) {
        return;
    }

    alert(
        "You have selected: " +
        event.name +
        "\n\nPlease fill your details in the User Profile section."
    );

    document.getElementById("profile")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function resetForm() {

    document.getElementById("eventForm").reset();

    document.getElementById("eventId").value = "";

    document.getElementById("formTitle")
        .textContent = "Create Event";

    document.getElementById("submitButton")
        .textContent = "Create Event";
}

function scrollToEvents() {

    document.getElementById("events")
        .scrollIntoView({
            behavior: "smooth"
        });
}

document.getElementById("profileForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("userName").value;

    const email =
        document.getElementById("userEmail").value;

    const phone =
        document.getElementById("userPhone").value;

    const college =
        document.getElementById("userCollege").value;

    document.getElementById("displayName")
        .textContent = "Name: " + name;

    document.getElementById("displayEmail")
        .textContent = "Email: " + email;

    document.getElementById("displayPhone")
        .textContent = "Phone: " + phone;

    document.getElementById("displayCollege")
        .textContent = "College: " + college;

    alert("Profile saved successfully!");
});

displayEvents();