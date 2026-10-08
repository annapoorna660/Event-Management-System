const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "..", "ERS", "script.js");
const script = fs.readFileSync(scriptPath, "utf8");

function createElement() {
  const listeners = {};
  const children = [];
  let innerHTML = "";

  return {
    listeners,
    children,
    className: "",
    textContent: "",
    value: "",
    appendChild(child) {
      children.push(child);
    },
    addEventListener(name, callback) {
      listeners[name] = callback;
    },
    reset() {
      this.resetCalled = true;
      this.value = "";
    },
    scrollIntoView() {
      this.scrolledIntoView = true;
    },
    set innerHTML(value) {
      innerHTML = value;
      if (value === "") children.length = 0;
    },
    get innerHTML() {
      return innerHTML;
    },
  };
}

function createApp() {
  const ids = [
    "eventList", "eventForm", "profileForm", "eventId", "eventName",
    "eventDate", "eventTime", "eventVenue", "eventDescription",
    "formTitle", "submitButton", "create", "events", "profile",
    "userName", "userEmail", "userPhone", "userCollege",
    "displayName", "displayEmail", "displayPhone", "displayCollege",
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, createElement()]));
  const alerts = [];
  const context = vm.createContext({
    document: {
      getElementById: (id) => elements[id],
      createElement,
    },
    alert: (message) => alerts.push(message),
    confirm: () => true,
    Date,
  });

  vm.runInContext(script, context, { filename: scriptPath });
  return { elements, alerts, context };
}

function submit(form) {
  let prevented = false;
  form.listeners.submit({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
}

test("renders the three starter events", () => {
  const { elements } = createApp();

  assert.equal(elements.eventList.children.length, 3);
  assert.match(elements.eventList.children[0].innerHTML, /Web Development Workshop/);
  assert.match(elements.eventList.children[1].innerHTML, /AI & Machine Learning Seminar/);
});

test("creates and resets a new event", () => {
  const { elements } = createApp();
  elements.eventName.value = "Design Meetup";
  elements.eventDate.value = "2026-12-10";
  elements.eventTime.value = "18:30";
  elements.eventVenue.value = "Room 4";
  elements.eventDescription.value = "A community meetup";

  submit(elements.eventForm);

  assert.equal(elements.eventList.children.length, 4);
  assert.match(elements.eventList.children[3].innerHTML, /Design Meetup/);
  assert.equal(elements.eventForm.resetCalled, true);
  assert.equal(elements.eventId.value, "");
  assert.equal(elements.formTitle.textContent, "Create Event");
});

test("edits and deletes an event", () => {
  const { elements, context } = createApp();

  context.editEvent(1);
  assert.equal(elements.eventName.value, "Web Development Workshop");
  assert.equal(elements.submitButton.textContent, "Update Event");

  elements.eventName.value = "Updated Workshop";
  submit(elements.eventForm);
  assert.match(elements.eventList.children[0].innerHTML, /Updated Workshop/);

  context.deleteEvent(1);
  assert.equal(elements.eventList.children.length, 2);
  assert.doesNotMatch(
    elements.eventList.children.map((card) => card.innerHTML).join(" "),
    /Updated Workshop/,
  );
});

test("saves the user profile", () => {
  const { elements, alerts } = createApp();
  elements.userName.value = "Sam Taylor";
  elements.userEmail.value = "sam@example.com";
  elements.userPhone.value = "1234567890";
  elements.userCollege.value = "Example College";

  submit(elements.profileForm);

  assert.equal(elements.displayName.textContent, "Name: Sam Taylor");
  assert.equal(elements.displayEmail.textContent, "Email: sam@example.com");
  assert.equal(elements.displayPhone.textContent, "Phone: 1234567890");
  assert.equal(elements.displayCollege.textContent, "College: Example College");
  assert.equal(alerts.at(-1), "Profile saved successfully!");
});