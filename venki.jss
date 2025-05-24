// ==========================
// 1. JavaScript Setup
// ==========================
console.log("Welcome to the Community Portal");
window.onload = () => alert("Page Loaded Successfully!");

// ==========================
// 2. Data Types & Operators
// ==========================
const eventName = "Music Fiesta";
const eventDate = "2025-06-01";
let availableSeats = 50;

console.log(`Event: ${eventName} on ${eventDate}. Seats: ${availableSeats}`);

// ==========================
// 3. Conditionals, Loops, Error Handling
// ==========================
const events = [
  { name: "Yoga Class", date: "2025-05-28", category: "Wellness", seats: 0 },
  { name: "Coding Bootcamp", date: "2025-06-02", category: "Tech", seats: 10 },
  { name: "Music Fiesta", date: "2025-06-01", category: "Music", seats: 20 },
];

events.forEach(event => {
  if (new Date(event.date) > new Date() && event.seats > 0) {
    console.log(`Upcoming: ${event.name}`);
  } else {
    console.log(`Not valid: ${event.name}`);
  }
});

// ==========================
// 4. Functions, Closures, HOFs
// ==========================
function addEvent(name, date, category, seats) {
  events.push({ name, date, category, seats });
}

function registerUser(eventName) {
  try {
    const event = events.find(e => e.name === eventName);
    if (event && event.seats > 0) {
      event.seats--;
      console.log(`Registered for ${event.name}`);
    } else {
      throw new Error("Event full or not found");
    }
  } catch (err) {
    console.error(err.message);
  }
}

function filterEventsByCategory(category, callback) {
  const filtered = events.filter(e => e.category === category);
  callback(filtered);
}

// Closure to track total registrations by category
function createCategoryCounter() {
  const count = {};
  return function(category) {
    count[category] = (count[category] || 0) + 1;
    console.log(`${category} registrations: ${count[category]}`);
  };
}
const trackRegistration = createCategoryCounter();

// ==========================
// 5. Objects & Prototypes
// ==========================
function Event(name, date, category, seats) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.seats = seats;
}
Event.prototype.checkAvailability = function() {
  return this.seats > 0;
};

const workshop = new Event("Workshop on Baking", "2025-06-05", "Food", 25);
console.log(Object.entries(workshop));

// ==========================
// 6. Arrays and Methods
// ==========================
events.push({ name: "Jazz Night", date: "2025-06-03", category: "Music", seats: 15 });

const musicEvents = events.filter(e => e.category === "Music");

const formattedCards = events.map(e => `Event: ${e.name} on ${e.date}`);
console.log(formattedCards);

// ==========================
// 7. DOM Manipulation
// ==========================
const eventList = document.querySelector("#eventList");

function displayEvents(events) {
  eventList.innerHTML = "";
  events.forEach(e => {
    const card = document.createElement("div");
    card.className = "eventCard";
    card.innerHTML = `<h3>${e.name}</h3><p>Date: ${e.date}</p><p>Seats: ${e.seats}</p>
    <button onclick="registerUser('${e.name}')">Register</button>`;
    eventList.appendChild(card);
  });
}
displayEvents(events);

// ==========================
// 8. Event Handling
// ==========================
document.querySelector("#categoryFilter").onchange = function() {
  const value = this.value;
  const filtered = events.filter(e => e.category === value);
  displayEvents(filtered);
};

document.querySelector("#searchInput").addEventListener("keydown", function(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = events.filter(e => e.name.toLowerCase().includes(keyword));
  displayEvents(filtered);
});

// ==========================
// 9. Async JS - Fetch API
// ==========================
function fetchEventsMock() {
  console.log("Loading events...");
  fetch("https://mockapi.io/api/v1/events") // Replace with your mock URL
    .then(res => res.json())
    .then(data => {
      console.log("Events fetched:", data);
      displayEvents(data);
    })
    .catch(err => console.error("Fetch failed:", err));
}

// Async/await version
async function fetchEventsAsync() {
  try {
    const spinner = document.querySelector("#loadingSpinner");
    spinner.style.display = "block";
    const res = await fetch("https://mockapi.io/api/v1/events");
    const data = await res.json();
    displayEvents(data);
    spinner.style.display = "none";
  } catch (err) {
    console.error("Async error:", err);
  }
}

// ==========================
// 10. Modern JS Features
// ==========================
function showEvent({ name, date, seats }) {
  console.log(`Name: ${name}, Date: ${date}, Seats: ${seats}`);
}

const cloneList = [...events];
console.log("Cloned list", cloneList);

// ==========================
// 11. Forms and Validation
// ==========================
document.querySelector("#registerForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.elements["username"].value;
  const email = this.elements["email"].value;
  const selectedEvent = this.elements["event"].value;

  if (!name || !email || !selectedEvent) {
    alert("All fields are required!");
    return;
  }

  console.log(`Registered: ${name}, ${email}, Event: ${selectedEvent}`);
});

// ==========================
// 12. AJAX + Fetch Simulated POST
// ==========================
function submitRegistration(userData) {
  fetch("https://mockapi.io/api/v1/registrations", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Registration success", data);
      alert("Registration successful!");
    })
    .catch(err => {
      console.error("Submission failed", err);
      alert("Failed to register.");
    });
}

// Simulate delay
setTimeout(() => {
  console.log("Simulated delayed response");
}, 2000);

// ==========================
// 13. Debugging Example
// ==========================
function debugFormSubmission() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = form.elements["username"].value;
    console.log("Name input:", name);
    debugger;
  });
}

// ==========================
// 14. jQuery Usage Example
// ==========================
// Make sure jQuery is included in HTML for this part to work
$(document).ready(function() {
  $("#registerBtn").click(function() {
    alert("jQuery Click Event Triggered!");
  });

  $(".eventCard").fadeIn(1000).fadeOut(1000);
});

// Note: Framework benefit example
// React or Vue simplify state management, component reusability, and complex UI rendering.


