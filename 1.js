/* =====================================================
   EVENT REGISTRATION SYSTEM
   DELETE EVENT - FRONTEND
===================================================== */


/* ================= EVENT DATA ================= */

let events = JSON.parse(localStorage.getItem("events")) || [
    {
        id: 1,
        name: "Tech Fest 2026",
        date: "2026-10-20",
        location: "Bangalore",
        description: "A technology event featuring workshops, coding competitions and technical presentations."
    },
    {
        id: 2,
        name: "Cultural Festival",
        date: "2026-10-25",
        location: "Ballari",
        description: "A cultural event celebrating music, dance, art and student performances."
    },
    {
        id: 3,
        name: "AI Workshop",
        date: "2026-11-05",
        location: "Bangalore",
        description: "Hands-on workshop covering Artificial Intelligence and Machine Learning concepts."
    },
    {
        id: 4,
        name: "Sports Meet",
        date: "2026-11-12",
        location: "College Ground",
        description: "Inter-college sports competition including cricket, football and athletics."
    }
];

let eventToDelete = null;


/* ================= PAGE LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
});


/* ================= UTILITIES ================= */

function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatDate(dateString) {
    if (!dateString) {
        return "N/A";
    }

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}

function showSuccessMessage(message) {
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successMessage.style.display = "block";

    clearTimeout(showSuccessMessage.timeoutId);
    showSuccessMessage.timeoutId = setTimeout(function () {
        successMessage.style.display = "none";
    }, 2000);
}


/* ================= DISPLAY EVENTS ================= */

function displayEvents(searchText = "") {
    const container = document.getElementById("eventContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const filteredEvents = events.filter(function (event) {
        const query = searchText.toLowerCase();
        return (
            event.name.toLowerCase().includes(query) ||
            event.location.toLowerCase().includes(query)
        );
    });

    const countEl = document.getElementById("eventCount");
    if (countEl) {
        countEl.textContent = filteredEvents.length;
    }

    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No Events Found</h2>
                <p>There are no events matching your search.</p>
            </div>
        `;
        return;
    }

    filteredEvents.forEach(function (event) {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-header">
                <h3>${escapeHTML(event.name)}</h3>
            </div>

            <div class="event-body">
                <div class="event-info">📅 <strong>Date:</strong> ${formatDate(event.date)}</div>
                <div class="event-info">📍 <strong>Location:</strong> ${escapeHTML(event.location)}</div>
                <div class="event-description">${escapeHTML(event.description)}</div>
            </div>

            <div class="event-footer">
                <button class="view-btn" onclick="viewEvent(${event.id})">View</button>
                <button class="delete-btn" onclick="openDeleteModal(${event.id})">🗑 Delete</button>
            </div>
        `;

        container.appendChild(card);
    });
}


/* ================= SEARCH ================= */

function searchEvents() {
    const searchInput = document.getElementById("searchInput");
    const searchText = searchInput.value.trim();
    displayEvents(searchText);
}


/* ================= CREATE EVENT ================= */

function openCreateModal() {
    const modal = document.getElementById("createModal");
    if (modal) {
        modal.style.display = "flex";
    }
}

function closeCreateModal() {
    const modal = document.getElementById("createModal");
    if (modal) {
        modal.style.display = "none";
    }

    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventLocation").value = "";
    document.getElementById("eventDescription").value = "";
}

function submitCreateEvent() {
    const nameInput = document.getElementById("eventName");
    const dateInput = document.getElementById("eventDate");
    const locationInput = document.getElementById("eventLocation");
    const descriptionInput = document.getElementById("eventDescription");

    const name = nameInput.value.trim();
    const date = dateInput.value;
    const location = locationInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!name || !date || !location || !description) {
        alert("Please fill in all event details.");
        return;
    }

    const nextId = events.length ? Math.max(...events.map(function (event) {
        return event.id;
    })) + 1 : 1;

    events.push({
        id: nextId,
        name: name,
        date: date,
        location: location,
        description: description
    });

    saveEvents();
    closeCreateModal();
    displayEvents();
    showSuccessMessage("Event created successfully.");
}


/* ================= VIEW EVENT ================= */

function viewEvent(id) {
    const event = events.find(function (item) {
        return item.id === id;
    });

    if (!event) {
        alert("Event not found.");
        return;
    }

    const details = [
        "Event Details",
        "Name: " + event.name,
        "Date: " + formatDate(event.date),
        "Location: " + event.location,
        "Description: " + event.description
    ].join("\n");

    alert(details);
}


/* ================= OPEN DELETE MODAL ================= */

function openDeleteModal(id) {
    const selectedEvent = events.find(function (event) {
        return event.id === id;
    });

    if (!selectedEvent) {
        alert("Event not found.");
        return;
    }

    eventToDelete = id;
    document.getElementById("deleteEventName").textContent = selectedEvent.name;
    document.getElementById("deleteModal").style.display = "flex";
}


/* ================= CLOSE DELETE MODAL ================= */

function closeDeleteModal() {
    document.getElementById("deleteModal").style.display = "none";
    eventToDelete = null;
}


/* ================= CONFIRM DELETE ================= */

function confirmDelete() {
    if (eventToDelete === null) {
        alert("No event selected.");
        return;
    }

    events = events.filter(function (event) {
        return event.id !== eventToDelete;
    });

    saveEvents();
    closeDeleteModal();
    displayEvents();
    showSuccessMessage("Event deleted successfully.");
}
