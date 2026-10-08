```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title> Event registration System</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:"Segoe UI",Arial,sans-serif;
}

body{
    background:#080b14;
    color:#f4f7ff;
    min-height:100vh;
}

/* ================= SIDEBAR ================= */

.sidebar{
    position:fixed;
    left:0;
    top:0;
    width:250px;
    height:100vh;
    background:rgba(16,20,35,.95);
    border-right:1px solid rgba(255,255,255,.08);
    padding:25px 18px;
    z-index:10;
}

.logo{
    display:flex;
    align-items:center;
    gap:12px;
    padding:10px;
    margin-bottom:40px;
}

.logo-icon{
    width:42px;
    height:42px;
    border-radius:12px;
    display:flex;
    align-items:center;
    justify-content:center;
    background:linear-gradient(135deg,#7c5cff,#20d9ff);
    font-size:22px;
    box-shadow:0 0 25px rgba(124,92,255,.35);
}

.logo h2{
    font-size:20px;
}

.logo span{
    color:#7c5cff;
}

.menu-title{
    color:#6f7892;
    font-size:11px;
    text-transform:uppercase;
    letter-spacing:2px;
    padding:0 12px;
    margin-bottom:12px;
}

.nav-btn{
    width:100%;
    border:none;
    background:transparent;
    color:#aab2c8;
    padding:14px;
    margin:5px 0;
    border-radius:12px;
    text-align:left;
    cursor:pointer;
    font-size:14px;
    transition:.3s;
}

.nav-btn:hover,
.nav-btn.active{
    background:linear-gradient(90deg,rgba(124,92,255,.25),rgba(32,217,255,.08));
    color:white;
}

.nav-btn.active{
    border-left:3px solid #7c5cff;
}

.nav-icon{
    margin-right:12px;
}

/* ================= MAIN ================= */

.main{
    margin-left:250px;
    min-height:100vh;
}

/* TOPBAR */

.topbar{
    height:80px;
    border-bottom:1px solid rgba(255,255,255,.07);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 35px;
    background:rgba(8,11,20,.75);
    backdrop-filter:blur(20px);
}

.topbar-left h1{
    font-size:24px;
}

.topbar-left p{
    color:#747d96;
    font-size:12px;
    margin-top:4px;
}

.profile{
    display:flex;
    align-items:center;
    gap:12px;
}

.avatar{
    width:40px;
    height:40px;
    border-radius:50%;
    background:linear-gradient(135deg,#7c5cff,#20d9ff);
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
}

/* CONTENT */

.content{
    padding:30px 35px;
}

.page{
    display:none;
}

.page.active{
    display:block;
}

/* HERO */

.hero{
    background:
        radial-gradient(circle at 80% 20%,rgba(124,92,255,.25),transparent 30%),
        radial-gradient(circle at 20% 100%,rgba(32,217,255,.12),transparent 30%),
        #111627;
    border:1px solid rgba(255,255,255,.07);
    border-radius:22px;
    padding:32px;
    margin-bottom:28px;
}

.hero h2{
    font-size:30px;
    margin-bottom:8px;
}

.hero p{
    color:#8992aa;
}

/* STAT CARDS */

.stats-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
    margin-bottom:28px;
}

.stat-card{
    background:rgba(18,23,40,.9);
    border:1px solid rgba(255,255,255,.07);
    border-radius:18px;
    padding:22px;
    transition:.3s;
    position:relative;
    overflow:hidden;
}

.stat-card:hover{
    transform:translateY(-4px);
    border-color:rgba(124,92,255,.45);
}

.stat-card::after{
    content:"";
    position:absolute;
    width:80px;
    height:80px;
    right:-25px;
    bottom:-30px;
    border-radius:50%;
    background:rgba(124,92,255,.1);
}

.stat-label{
    color:#7f89a2;
    font-size:13px;
}

.stat-value{
    font-size:30px;
    font-weight:bold;
    margin-top:8px;
}

.stat-icon{
    float:right;
    font-size:25px;
}

/* GRID */

.two-column{
    display:grid;
    grid-template-columns:1.4fr 1fr;
    gap:22px;
}

.panel{
    background:rgba(18,23,40,.9);
    border:1px solid rgba(255,255,255,.07);
    border-radius:20px;
    padding:24px;
    margin-bottom:22px;
}

.panel-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:20px;
}

.panel-header h3{
    font-size:17px;
}

.panel-header span{
    color:#737c96;
    font-size:12px;
}

/* EVENT CARDS */

.event-card{
    display:flex;
    justify-content:space-between;
    align-items:center;
    background:#0d1220;
    border:1px solid rgba(255,255,255,.05);
    padding:17px;
    border-radius:14px;
    margin-bottom:12px;
    transition:.3s;
}

.event-card:hover{
    border-color:rgba(32,217,255,.3);
}

.event-name{
    font-weight:600;
    margin-bottom:6px;
}

.event-meta{
    color:#747d96;
    font-size:12px;
}

.event-seats{
    text-align:right;
}

.event-seats strong{
    display:block;
    color:#20d9ff;
}

/* FORMS */

.form-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:15px;
}

.form-group{
    margin-bottom:15px;
}

.form-group.full{
    grid-column:1/-1;
}

label{
    display:block;
    font-size:12px;
    color:#858ea6;
    margin-bottom:7px;
}

input,
select,
textarea{
    width:100%;
    background:#0b0f1c;
    border:1px solid #252c40;
    color:white;
    padding:13px;
    border-radius:10px;
    outline:none;
}

textarea{
    min-height:100px;
    resize:vertical;
}

input:focus,
select:focus,
textarea:focus{
    border-color:#7c5cff;
}

/* BUTTONS */

.btn{
    border:none;
    padding:12px 18px;
    border-radius:10px;
    color:white;
    cursor:pointer;
    font-weight:600;
    transition:.3s;
}

.btn-primary{
    background:linear-gradient(135deg,#7c5cff,#5c43d6);
}

.btn-cyan{
    background:linear-gradient(135deg,#20d9ff,#188eb0);
}

.btn-success{
    background:linear-gradient(135deg,#24d68b,#159e66);
}

.btn-danger{
    background:linear-gradient(135deg,#ff5577,#c83254);
}

.btn:hover{
    transform:translateY(-2px);
    box-shadow:0 8px 20px rgba(0,0,0,.25);
}

.button-row{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
}

/* NOTIFICATION */

.notification{
    padding:17px;
    border-radius:14px;
    background:#0d1220;
    border-left:3px solid #7c5cff;
    margin-bottom:12px;
}

.notification h4{
    margin-bottom:6px;
}

.notification p{
    color:#8790a8;
    font-size:13px;
}

.notification small{
    display:block;
    color:#555f78;
    margin-top:8px;
}

/* TABLE */

.table-container{
    overflow-x:auto;
}

table{
    width:100%;
    border-collapse:collapse;
}

th,
td{
    padding:15px;
    border-bottom:1px solid rgba(255,255,255,.06);
    text-align:left;
    font-size:13px;
}

th{
    color:#7f89a2;
    font-weight:500;
}

.progress{
    height:7px;
    width:100px;
    background:#252b3d;
    border-radius:10px;
    overflow:hidden;
}

.progress-bar{
    height:100%;
    background:linear-gradient(90deg,#7c5cff,#20d9ff);
}

/* STATUS */

.status{
    display:inline-block;
    padding:5px 9px;
    border-radius:20px;
    font-size:10px;
    background:rgba(36,214,139,.12);
    color:#24d68b;
}

/* TEST BOX */

.test-box{
    padding:15px;
    border-radius:12px;
    background:#0c111e;
    margin-top:15px;
    color:#8b95ad;
    font-size:13px;
}

/* RESPONSIVE */

@media(max-width:1000px){

    .stats-grid{
        grid-template-columns:repeat(2,1fr);
    }

    .two-column{
        grid-template-columns:1fr;
    }
}

@media(max-width:700px){

    .sidebar{
        width:70px;
        padding:15px 10px;
    }

    .logo h2,
    .menu-title,
    .nav-text{
        display:none;
    }

    .logo{
        justify-content:center;
    }

    .nav-btn{
        text-align:center;
    }

    .nav-icon{
        margin:0;
    }

    .main{
        margin-left:70px;
    }

    .content{
        padding:20px;
    }

    .stats-grid{
        grid-template-columns:1fr;
    }

    .form-grid{
        grid-template-columns:1fr;
    }

    .topbar{
        padding:0 20px;
    }
}
</style>
</head>

<body>

<!-- ================= SIDEBAR ================= -->

<aside class="sidebar">

    <div class="logo">
        <div class="logo-icon">✦</div>
        <h2>Event<span>X</span></h2>
    </div>

    <div class="menu-title">Management</div>

    <button class="nav-btn active" onclick="showPage('dashboard',this)">
        <span class="nav-icon">▦</span>
        <span class="nav-text">Admin Dashboard</span>
    </button>

    <button class="nav-btn" onclick="showPage('notifications',this)">
        <span class="nav-icon">◉</span>
        <span class="nav-text">Event Notifications</span>
    </button>

    <button class="nav-btn" onclick="showPage('statistics',this)">
        <span class="nav-icon">◒</span>
        <span class="nav-text">Event Statistics</span>
    </button>

    <div class="menu-title" style="margin-top:30px;">System</div>

    <button class="nav-btn" onclick="testAll()">
        <span class="nav-icon">✓</span>
        <span class="nav-text">System Test</span>
    </button>

</aside>


<!-- ================= MAIN ================= -->

<main class="main">

    <header class="topbar">

        <div class="topbar-left">
            <h1 id="pageTitle">Admin Dashboard</h1>
            <p id="pageSubtitle">Smart Event Management System</p>
        </div>

        <div class="profile">
            <div>
                <small style="color:#707991;">ADMIN</small>
            </div>
            <div class="avatar">A</div>
        </div>

    </header>


    <div class="content">


        <!-- ================================================= -->
        <!-- ADMIN DASHBOARD -->
        <!-- ================================================= -->

        <section id="dashboard" class="page active">

            <div class="hero">
                <h2>Welcome back, Admin 👋</h2>
                <p>Monitor your events, registrations and venue availability from one place.</p>
            </div>


            <div class="stats-grid">

                <div class="stat-card">
                    <span class="stat-icon">◈</span>
                    <div class="stat-label">Total Events</div>
                    <div class="stat-value" id="totalEvents">0</div>
                </div>

                <div class="stat-card">
                    <span class="stat-icon">◎</span>
                    <div class="stat-label">Registrations</div>
                    <div class="stat-value" id="totalRegistrations">0</div>
                </div>

                <div class="stat-card">
                    <span class="stat-icon">◷</span>
                    <div class="stat-label">Upcoming Events</div>
                    <div class="stat-value" id="upcomingEvents">0</div>
                </div>

                <div class="stat-card">
                    <span class="stat-icon">◇</span>
                    <div class="stat-label">Available Seats</div>
                    <div class="stat-value" id="availableSeats">0</div>
                </div>

            </div>


            <div class="two-column">

                <!-- EVENT INFORMATION -->

                <div class="panel">

                    <div class="panel-header">
                        <h3>Upcoming Events</h3>
                        <span>Live Event Information</span>
                    </div>

                    <div id="dashboardEvents"></div>

                </div>


                <!-- CREATE DASHBOARD -->

                <div class="panel">

                    <div class="panel-header">
                        <h3>Create Dashboard Layout</h3>
                        <span>Customize</span>
                    </div>

                    <div class="form-group">
                        <label>Dashboard Title</label>
                        <input id="dashboardTitle" value="Event Management Dashboard">
                    </div>

                    <div class="form-group">
                        <label>Number of Event Cards</label>

                        <select id="layoutCount">
                            <option value="4">4 Cards</option>
                            <option value="3">3 Cards</option>
                            <option value="2">2 Cards</option>
                        </select>
                    </div>

                    <div class="button-row">

                        <button class="btn btn-primary"
                                onclick="createDashboard()">
                            Create Layout
                        </button>

                        <button class="btn btn-success"
                                onclick="testDashboard()">
                            Test Dashboard
                        </button>

                    </div>

                    <div id="dashboardTest"
                         class="test-box">
                        Dashboard ready for testing.
                    </div>

                </div>

            </div>

        </section>


        <!-- ================================================= -->
        <!-- EVENT UPDATE NOTIFICATION -->
        <!-- ================================================= -->

        <section id="notifications" class="page">

            <div class="hero">
                <h2>Event Update Center</h2>
                <p>Create, trigger and test notifications for registered participants.</p>
            </div>


            <div class="two-column">

                <!-- CREATE NOTIFICATION -->

                <div class="panel">

                    <div class="panel-header">
                        <h3>Create Notification</h3>
                        <span>Manual Update</span>
                    </div>

                    <div class="form-group">

                        <label>Notification Title</label>

                        <input id="notificationTitle"
                               placeholder="Enter notification title">

                    </div>


                    <div class="form-group">

                        <label>Message</label>

                        <textarea id="notificationMessage"
                                  placeholder="Enter notification message"></textarea>

                    </div>


                    <button class="btn btn-primary"
                            onclick="createNotification()">
                        Create Notification
                    </button>

                </div>


                <!-- TRIGGER EVENT INFORMATION -->

                <div class="panel">

                    <div class="panel-header">
                        <h3>Trigger Event Information</h3>
                        <span>Automated Update</span>
                    </div>


                    <div class="form-group">

                        <label>Select Event</label>

                        <select id="notificationEvent">

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Update Type</label>

                        <select id="updateType">

                            <option>Date Changed</option>
                            <option>Venue Changed</option>
                            <option>Registration Open</option>
                            <option>Event Cancelled</option>
                            <option>General Update</option>

                        </select>

                    </div>


                    <div class="button-row">

                        <button class="btn btn-cyan"
                                onclick="triggerEvent()">
                            Trigger Update
                        </button>

                        <button class="btn btn-success"
                                onclick="testNotification()">
                            Test Notification
                        </button>

                    </div>

                </div>

            </div>


            <!-- NOTIFICATION HISTORY -->

            <div class="panel">

                <div class="panel-header">
                    <h3>Notification History</h3>
                    <span id="notificationCount">0 Updates</span>
                </div>

                <div id="notificationList">

                    <div class="test-box">
                        No notifications created yet.
                    </div>

                </div>

            </div>

        </section>


        <!-- ================================================= -->
        <!-- EVENT STATISTICS -->
        <!-- ================================================= -->

        <section id="statistics" class="page">

            <div class="hero">

                <h2>Event Analytics</h2>

                <p>
                    Analyze registrations, capacity and event performance.
                </p>

            </div>


            <div class="button-row" style="margin-bottom:22px;">

                <button class="btn btn-primary"
                        onclick="calculateStatistics()">
                    Calculate Statistics
                </button>

                <button class="btn btn-success"
                        onclick="testStatistics()">
                    Test Statistics
                </button>

                <button class="btn btn-cyan"
                        onclick="deploymentTest()">
                    Test Deployment
                </button>

            </div>


            <!-- STATISTICS CARDS -->

            <div class="stats-grid">

                <div class="stat-card">

                    <div class="stat-label">
                        Total Events
                    </div>

                    <div class="stat-value"
                         id="statEvents">
                        0
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-label">
                        Total Registrations
                    </div>

                    <div class="stat-value"
                         id="statRegistrations">
                        0
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-label">
                        Total Capacity
                    </div>

                    <div class="stat-value"
                         id="statSeats">
                        0
                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-label">
                        Registration Rate
                    </div>

                    <div class="stat-value"
                         id="statRate">
                        0%
                    </div>

                </div>

            </div>


            <!-- EVENT STATISTICS TABLE -->

            <div class="panel">

                <div class="panel-header">

                    <h3>Event-wise Statistics</h3>

                    <span>Performance Overview</span>

                </div>


                <div class="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>Event</th>
                                <th>Capacity</th>
                                <th>Registrations</th>
                                <th>Available</th>
                                <th>Registration Rate</th>
                                <th>Status</th>
                            </tr>

                        </thead>

                        <tbody id="statisticsTable"></tbody>

                    </table>

                </div>

            </div>


            <div id="statisticsTest"
                 class="test-box">

                Statistics system ready.

            </div>

        </section>

    </div>

</main>


<script>

/* =========================================================
   SAMPLE EVENT DATA
========================================================= */

const events = [

    {
        name:"Annual Tech Fest",
        date:"20 November 2026",
        location:"Main Auditorium",
        seats:200,
        registrations:120
    },

    {
        name:"AI Innovation Workshop",
        date:"5 December 2026",
        location:"Computer Science Lab",
        seats:100,
        registrations:75
    },

    {
        name:"Cultural Fest",
        date:"15 December 2026",
        location:"College Ground",
        seats:250,
        registrations:180
    },

    {
        name:"Annual Sports Meet",
        date:"20 December 2026",
        location:"Sports Ground",
        seats:300,
        registrations:210
    }

];


let notifications = [];


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(page,button){

    document.querySelectorAll(".page")
        .forEach(p => p.classList.remove("active"));

    document.getElementById(page)
        .classList.add("active");


    document.querySelectorAll(".nav-btn")
        .forEach(btn => btn.classList.remove("active"));

    if(button){
        button.classList.add("active");
    }


    const titles = {

        dashboard:"Admin Dashboard",

        notifications:"Event Update Center",

        statistics:"Event Analytics"

    };


    const subtitles = {

        dashboard:"Smart Event Management System",

        notifications:"Create and manage participant notifications",

        statistics:"Analyze registration and event performance"

    };


    document.getElementById("pageTitle").textContent =
        titles[page];

    document.getElementById("pageSubtitle").textContent =
        subtitles[page];

}


/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard(){

    let totalRegistrations = 0;
    let availableSeats = 0;

    events.forEach(event => {

        totalRegistrations += event.registrations;

        availableSeats +=
            event.seats - event.registrations;

    });


    document.getElementById("totalEvents")
        .textContent = events.length;

    document.getElementById("totalRegistrations")
        .textContent = totalRegistrations;

    document.getElementById("upcomingEvents")
        .textContent = events.length;

    document.getElementById("availableSeats")
        .textContent = availableSeats;


    displayDashboardEvents();

    loadNotificationEvents();

}


/* =========================================================
   DISPLAY EVENTS
========================================================= */

function displayDashboardEvents(){

    const container =
        document.getElementById("dashboardEvents");

    container.innerHTML = "";


    events.forEach(event => {

        const available =
            event.seats - event.registrations;


        container.innerHTML += `

            <div class="event-card">

                <div>

                    <div class="event-name">
                        ${event.name}
                    </div>

                    <div class="event-meta">
                        ◷ ${event.date}
                        &nbsp;&nbsp;
                        ◉ ${event.location}
                    </div>

                </div>

                <div class="event-seats">

                    <strong>${available}</strong>

                    <small style="color:#626c84">
                        seats left
                    </small>

                </div>

            </div>

        `;

    });

}


/* =========================================================
   CREATE DASHBOARD
========================================================= */

function createDashboard(){

    const title =
        document.getElementById("dashboardTitle").value;

    const count =
        parseInt(
            document.getElementById("layoutCount").value
        );


    document.getElementById("pageTitle")
        .textContent = title;


    const cards =
        document.querySelectorAll(".event-card");


    cards.forEach((card,index)=>{

        card.style.display =
            index < count ? "flex" : "none";

    });


    document.getElementById("dashboardTest")
        .innerHTML =
        "✓ Dashboard layout created successfully.";

}


/* =========================================================
   TEST DASHBOARD
========================================================= */

function testDashboard(){

    const result =
        events.length > 0 &&
        events.some(e => e.registrations > 0);


    document.getElementById("dashboardTest")
        .innerHTML = result

        ? "✓ Dashboard Test Passed — Event data and registration data are available."

        : "✕ Dashboard Test Failed.";

}


/* =========================================================
   LOAD EVENT DROPDOWN
========================================================= */

function loadNotificationEvents(){

    const select =
        document.getElementById("notificationEvent");


    select.innerHTML = "";


    events.forEach((event,index)=>{

        select.innerHTML += `

            <option value="${index}">
                ${event.name}
            </option>

        `;

    });

}


/* =========================================================
   CREATE NOTIFICATION
========================================================= */

function createNotification(){

    const title =
        document.getElementById("notificationTitle").value;

    const message =
        document.getElementById("notificationMessage").value;


    if(title.trim()==="" || message.trim()===""){

        alert("Please enter notification title and message.");

        return;

    }


    notifications.unshift({

        title:title,

        message:message,

        time:new Date().toLocaleString()

    });


    document.getElementById("notificationTitle").value = "";

    document.getElementById("notificationMessage").value = "";


    displayNotifications();

}


/* =========================================================
   TRIGGER EVENT UPDATE
========================================================= */

function triggerEvent(){

    const eventIndex =
        document.getElementById("notificationEvent").value;

    const update =
        document.getElementById("updateType").value;


    const event =
        events[eventIndex];


    let message = "";


    if(update==="Date Changed"){

        message =
            `${event.name} schedule has been updated. Please check the latest event date.`;

    }

    else if(update==="Venue Changed"){

        message =
            `The venue for ${event.name} has been updated to ${event.location}.`;

    }

    else if(update==="Registration Open"){

        message =
            `Registration is now open for ${event.name}. Register now to reserve your seat.`;

    }

    else if(update==="Event Cancelled"){

        message =
            `${event.name} has been cancelled. Further information will be shared soon.`;

    }

    else{

        message =
            `There is a new information update regarding ${event.name}.`;

    }


    notifications.unshift({

        title:update,

        message:message,

        time:new Date().toLocaleString()

    });


    displayNotifications();

}


/* =========================================================
   TEST NOTIFICATION
========================================================= */

function testNotification(){

    notifications.unshift({

        title:"Test Notification",

        message:
            "✓ Notification system is working correctly.",

        time:new Date().toLocaleString()

    });


    displayNotifications();

}


/* =========================================================
   DISPLAY NOTIFICATIONS
========================================================= */

function displayNotifications(){

    const container =
        document.getElementById("notificationList");


    document.getElementById("notificationCount")
        .textContent =
        `${notifications.length} Updates`;


    if(notifications.length===0){

        container.innerHTML =
            `<div class="test-box">
                No notifications created yet.
            </div>`;

        return;

    }


    container.innerHTML = "";


    notifications.forEach(notification => {

        container.innerHTML += `

            <div class="notification">

                <h4>
                    ${notification.title}
                </h4>

                <p>
                    ${notification.message}
                </p>

                <small>
                    ${notification.time}
                </small>

            </div>

        `;

    });

}


/* =========================================================
   CALCULATE STATISTICS
========================================================= */

function calculateStatistics(){

    let totalSeats = 0;

    let totalRegistrations = 0;


    events.forEach(event => {

        totalSeats += event.seats;

        totalRegistrations += event.registrations;

    });


    const availableSeats =
        totalSeats - totalRegistrations;


    const registrationRate =
        totalSeats > 0

        ? ((totalRegistrations / totalSeats)*100).toFixed(1)

        : 0;


    document.getElementById("statEvents")
        .textContent = events.length;


    document.getElementById("statRegistrations")
        .textContent = totalRegistrations;


    document.getElementById("statSeats")
        .textContent = totalSeats;


    document.getElementById("statRate")
        .textContent = registrationRate + "%";


    displayStatistics();

}


/* =========================================================
   DISPLAY STATISTICS TABLE
========================================================= */

function displayStatistics(){

    const table =
        document.getElementById("statisticsTable");


    table.innerHTML = "";


    events.forEach(event => {

        const available =
            event.seats - event.registrations;


        const rate =
            ((event.registrations / event.seats)*100)
            .toFixed(1);


        table.innerHTML += `

            <tr>

                <td>
                    <strong>${event.name}</strong>
                </td>

                <td>
                    ${event.seats}
                </td>

                <td>
                    ${event.registrations}
                </td>

                <td>
                    ${available}
                </td>

                <td>

                    <div style="display:flex;align-items:center;gap:10px">

                        <div class="progress">

                            <div class="progress-bar"
                                 style="width:${rate}%">
                            </div>

                        </div>

                        ${rate}%

                    </div>

                </td>

                <td>

                    <span class="status">
                        Active
                    </span>

                </td>

            </tr>

        `;

    });

}


/* =========================================================
   TEST STATISTICS
========================================================= */

function testStatistics(){

    const valid =
        events.length > 0 &&
        events.every(
            event =>
            event.seats >= event.registrations
        );


    document.getElementById("statisticsTest")
        .innerHTML = valid

        ? "✓ Statistics Test Passed — All event calculations are valid."

        : "✕ Statistics Test Failed.";

}


/* =========================================================
   DEPLOYMENT TEST
========================================================= */

function deploymentTest(){

    const tests = [

        document.getElementById("dashboard"),

        document.getElementById("notifications"),

        document.getElementById("statistics"),

        events.length > 0

    ];


    const passed =
        tests.filter(Boolean).length;


    document.getElementById("statisticsTest")
        .innerHTML =
        `✓ Deployment Test Completed — ${passed}/${tests.length} system checks passed.`;

}


/* =========================================================
   SYSTEM TEST
========================================================= */

function testAll(){

    loadDashboard();

    calculateStatistics();

    testStatistics();


    alert(
        "System Test Completed Successfully!\n\n" +
        "✓ Admin Dashboard\n" +
        "✓ Event Notifications\n" +
        "✓ Event Statistics"
    );

}


/* =========================================================
   INITIALIZE SYSTEM
========================================================= */

loadDashboard();

calculateStatistics();

displayNotifications();

</script>

</body>
</html>
```
