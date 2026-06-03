const DAY_NAMES = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday" };
const DAY_ORDER = ["mon", "tue", "wed", "thu", "fri", "sat"];
const STORAGE_KEY = "dailyTaskDesk";
const IDB_NAME = "dailyTaskDesk";
const IDB_STORE = "handles";
const IDB_HANDLE_KEY = "dataJson";

const DEFAULT_DATA = {
  users: [
    { id: "admin", name: "Admin", username: "admin", password: "admin123", role: "admin", createdAt: "2026-06-01T00:00:00.000Z" }
  ],
  tasks: [
    { id: "sample-morning-review", userId: "admin", title: "Morning work review", type: "daily", days: DAY_ORDER, createdAt: "2026-06-01T00:00:00.000Z" }
  ],
  completions: {},
  notes: []
};

const icons = {
  "badge-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 12 2 2 4-4"/><path d="M3.9 9.6a2 2 0 0 1 0-3.2l1.3-.9.5-1.5a2 2 0 0 1 3-1.1l1.3.8 1.3-.8a2 2 0 0 1 3 1.1l.5 1.5 1.3.9a2 2 0 0 1 0 3.2l-.9.6.9.6a2 2 0 0 1 0 3.2l-1.3.9-.5 1.5a2 2 0 0 1-3 1.1l-1.3-.8-1.3.8a2 2 0 0 1-3-1.1l-.5-1.5-1.3-.9a2 2 0 0 1 0-3.2l.9-.6-.9-.6Z"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.3 21a2 2 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/></svg>',
  "calendar-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="m9 16 2 2 4-4"/></svg>',
  "clipboard-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  "file-check": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 15 2 2 4-4"/></svg>',
  "link-2": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>',
  "log-in": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17 5-5-5-5"/><path d="M15 12H3"/></svg>',
  "log-out": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  "notebook-pen": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4M2 10h4M2 14h4M2 18h4"/><path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L14 13l-4 1 1-4Z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5v14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/></svg>',
  "user-plus": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
  "volume-2": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 5 6 9H2v6h4l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m5 12 5 5L20 7"/></svg>'
};

// ── State ────────────────────────────────────────────────────────────────────
const state = {
  data: cloneData(DEFAULT_DATA),
  today: new Date(),
  currentUserId: null,
  authMode: "login",
  alarmTimer: null,
  audioContext: null,
  fileHandle: null   // FileSystemFileHandle for data.json, if connected
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
function cloneData(d) { return JSON.parse(JSON.stringify(d)); }

const elements = {
  authView: $("#authView"), appView: $("#appView"), loginTab: $("#loginTab"), registerTab: $("#registerTab"),
  loginForm: $("#loginForm"), registerForm: $("#registerForm"), loginUsername: $("#loginUsername"), loginPassword: $("#loginPassword"),
  registerName: $("#registerName"), registerUsername: $("#registerUsername"), registerPassword: $("#registerPassword"),
  loginStatus: $("#loginStatus"), registerStatus: $("#registerStatus"), authUserCount: $("#authUserCount"), authTaskCount: $("#authTaskCount"),
  welcomeText: $("#welcomeText"), listTitle: $("#listTitle"), datePill: $("#datePill"), progressText: $("#progressText"),
  progressPercent: $("#progressPercent"), progressBar: $("#progressBar"), taskList: $("#taskList"), emptyState: $("#emptyState"),
  summaryList: $("#summaryList"), summaryEmpty: $("#summaryEmpty"), adminPanel: $("#adminPanel"), adminDatePill: $("#adminDatePill"),
  adminList: $("#adminList"), taskForm: $("#taskForm"), taskTitle: $("#taskTitle"), dayChoices: $("#dayChoices"),
  repeatField: $("#repeatField"), scheduleField: $("#scheduleField"), scheduleDate: $("#scheduleDate"),
  assignField: $("#assignField"), assignUser: $("#assignUser"),
  submitTaskBtn: $("#submitTaskBtn"), formStatus: $("#formStatus"),
  noteText: $("#noteText"), noteStatus: $("#noteStatus"), noteOwner: $("#noteOwner"),
  backupBtn: $("#backupBtn"), restoreBtn: $("#restoreBtn"), restoreFile: $("#restoreFile"),
  connectFileBtn: $("#connectFileBtn"), fileStatusDot: $("#fileStatusDot"), fileStatusText: $("#fileStatusText"),
  logoutBtn: $("#logoutBtn"), alarmToggle: $("#alarmToggle"), alarmTitle: $("#alarmTitle"),
  alarmDescription: $("#alarmDescription"), alarmStatus: $("#alarmStatus"), testAlarmBtn: $("#testAlarmBtn")
};

function todayKey() {
  const y = state.today.getFullYear();
  const m = String(state.today.getMonth() + 1).padStart(2, "0");
  const d = String(state.today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function currentDayKey() { return [null, "mon", "tue", "wed", "thu", "fri", "sat"][state.today.getDay()] || "sun"; }
function currentUser() { return state.data.users.find((u) => u.id === state.currentUserId); }
function isAdmin() { return currentUser()?.role === "admin"; }
function formatDate() {
  return state.today.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric", year: "numeric" });
}

function showStatus(el, msg, isError = false) {
  el.textContent = msg;
  el.style.color = isError ? "var(--red)" : "var(--green)";
  window.clearTimeout(el._timer);
  el._timer = window.setTimeout(() => { el.textContent = ""; }, 2600);
}

// ── IndexedDB — persist file handle across page reloads ───────────────────────
function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key) {
  try {
    const db = await openIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch { return null; }
}

async function idbSet(key, value) {
  try {
    const db = await openIDB();
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).put(value, key);
  } catch {}
}

// ── File System Access API ────────────────────────────────────────────────────
function fsaSupported() { return typeof window.showOpenFilePicker === "function"; }

async function verifyWritePermission(handle) {
  if (!handle) return false;
  try {
    let perm = await handle.queryPermission({ mode: "readwrite" });
    if (perm === "granted") return true;
    perm = await handle.requestPermission({ mode: "readwrite" });
    return perm === "granted";
  } catch { return false; }
}

async function restoreSavedHandle() {
  if (!fsaSupported()) return;
  const saved = await idbGet(IDB_HANDLE_KEY);
  if (!saved) return;
  const ok = await verifyWritePermission(saved);
  if (ok) {
    state.fileHandle = saved;
    setFileStatus("connected");
  } else {
    setFileStatus("disconnected");
  }
}

async function connectDataFile() {
  if (!fsaSupported()) {
    alert("Your browser does not support direct file access.\nUse Chrome or Edge (served via http://localhost).\n\nData is still saved in localStorage — use Backup/Restore to export.");
    return;
  }
  try {
    const [handle] = await window.showOpenFilePicker({
      types: [{ description: "JSON file", accept: { "application/json": [".json"] } }],
      multiple: false
    });
    const ok = await verifyWritePermission(handle);
    if (!ok) { alert("Write permission was denied. Please allow write access."); return; }
    state.fileHandle = handle;
    await idbSet(IDB_HANDLE_KEY, handle);
    setFileStatus("connected");
    // Immediately sync current state to the connected file
    await writeToFile();
    showStatus(elements.formStatus, "data.json connected and synced.");
  } catch (e) {
    if (e.name !== "AbortError") { console.error(e); alert("Could not connect file: " + e.message); }
  }
}

async function writeToFile() {
  if (!state.fileHandle) return;
  try {
    const writable = await state.fileHandle.createWritable();
    await writable.write(JSON.stringify(state.data, null, 2));
    await writable.close();
  } catch (e) {
    console.warn("File write failed:", e);
    // If permission was lost (e.g. security error), clear handle
    if (e.name === "NotAllowedError" || e.name === "SecurityError") {
      state.fileHandle = null;
      setFileStatus("disconnected");
    }
  }
}

function setFileStatus(status) {
  const dot = elements.fileStatusDot;
  const text = elements.fileStatusText;
  if (!dot || !text) return;
  if (status === "connected") {
    dot.style.background = "var(--green)";
    text.textContent = "data.json";
    elements.connectFileBtn.title = "data.json connected — click to change file";
  } else {
    dot.style.background = "var(--muted)";
    text.textContent = "Connect file";
    elements.connectFileBtn.title = "Connect data.json for direct file saving";
  }
}

// ── Persistence ───────────────────────────────────────────────────────────────

// Always saves to localStorage immediately; writes to data.json asynchronously
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  writeToFile(); // fire-and-forget; localStorage is the reliable fallback
}

// Load priority: file handle → localStorage → fetch data.json seed → defaults
async function loadData() {
  await restoreSavedHandle();

  if (state.fileHandle) {
    try {
      const file = await state.fileHandle.getFile();
      const text = await file.text();
      return normalizeData(JSON.parse(text));
    } catch { state.fileHandle = null; setFileStatus("disconnected"); }
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return normalizeData(JSON.parse(stored)); } catch {}
  }

  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("not found");
    return normalizeData(await res.json());
  } catch {}

  return cloneData(DEFAULT_DATA);
}

// ── Data normalization ────────────────────────────────────────────────────────
function normalizeData(data) {
  const users = Array.isArray(data.users)
    ? data.users.filter((u) => u.username && u.password).map((u) => ({
        id: u.id || `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: u.name || u.username,
        username: u.username,
        password: u.password,
        role: u.role === "admin" ? "admin" : "user",
        alarmEnabled: Boolean(u.alarmEnabled),
        nextAlarmAt: u.nextAlarmAt || "",
        createdAt: u.createdAt || new Date().toISOString()
      }))
    : cloneData(DEFAULT_DATA.users);

  if (!users.some((u) => u.role === "admin")) users.unshift(cloneData(DEFAULT_DATA.users[0]));
  const validIds = new Set(users.map((u) => u.id));
  const tasks = Array.isArray(data.tasks)
    ? data.tasks.filter((t) => t?.title).map(normalizeTask).filter((t) => validIds.has(t.userId))
    : [];
  const notes = Array.isArray(data.notes) ? data.notes.filter((n) => validIds.has(n.userId)) : [];
  return { users, tasks, completions: normalizeCompletions(data.completions, validIds), notes };
}

function normalizeCompletions(completions, validIds) {
  const clean = {};
  Object.entries(completions || {}).forEach(([date, value]) => {
    if (Array.isArray(value)) { clean[date] = { admin: value }; return; }
    clean[date] = {};
    Object.entries(value || {}).forEach(([uid, ids]) => {
      if (validIds.has(uid)) clean[date][uid] = Array.isArray(ids) ? ids : [];
    });
  });
  return clean;
}

function normalizeTask(task) {
  const base = {
    id: task.id || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: task.userId || "admin",
    title: task.title,
    createdAt: task.createdAt || new Date().toISOString()
  };
  if (task.type === "scheduled") return { ...base, type: "scheduled", days: [], scheduleDate: task.scheduleDate || todayKey() };
  return { ...base, type: "daily", days: Array.isArray(task.days) ? task.days.filter((d) => DAY_ORDER.includes(d)) : DAY_ORDER };
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((n) => { n.innerHTML = icons[n.dataset.icon] || ""; });
}

// ── Avatar helpers ────────────────────────────────────────────────────────────
const AVATAR_PALETTE = ["#2563eb","#7c3aed","#db2777","#059669","#d97706","#dc2626","#0891b2","#0d9488"];

function getInitials(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?";
}

function getAvatarColor(userId) {
  let h = 0;
  for (const c of userId) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length];
}

// ── Auth screen ───────────────────────────────────────────────────────────────
function renderAuthStats() {
  elements.authUserCount.textContent = state.data.users.length;
  elements.authTaskCount.textContent = state.data.tasks.length;
}

function setAuthMode(mode) {
  state.authMode = mode;
  elements.loginTab.classList.toggle("active", mode === "login");
  elements.registerTab.classList.toggle("active", mode === "register");
  elements.loginForm.classList.toggle("hide", mode !== "login");
  elements.registerForm.classList.toggle("hide", mode !== "register");
}

function login(event) {
  event.preventDefault();
  const username = elements.loginUsername.value.trim().toLowerCase();
  const password = elements.loginPassword.value;
  const user = state.data.users.find((u) => u.username.toLowerCase() === username && u.password === password);
  if (!user) { showStatus(elements.loginStatus, "Invalid username or password.", true); return; }
  state.currentUserId = user.id;
  elements.loginForm.reset();
  renderApp();
}

function register(event) {
  event.preventDefault();
  const name = elements.registerName.value.trim();
  const username = elements.registerUsername.value.trim();
  const password = elements.registerPassword.value;

  if (username.length < 3 || password.length < 4) {
    showStatus(elements.registerStatus, "Use 3+ username letters and 4+ password letters.", true);
    return;
  }
  if (state.data.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    showStatus(elements.registerStatus, "Username already exists.", true);
    return;
  }

  const user = {
    id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: name || username, username, password,
    role: "user", alarmEnabled: false, nextAlarmAt: "",
    createdAt: new Date().toISOString()
  };
  state.data.users.push(user);
  saveData();
  renderAuthStats();
  elements.registerForm.reset();
  showStatus(elements.registerStatus, "User created. You can login now.");
  setAuthMode("login");
  elements.loginUsername.value = username;
  elements.loginPassword.focus();
}

function logout() {
  stopAlarmTimer();
  state.currentUserId = null;
  elements.appView.classList.add("hide");
  elements.authView.classList.remove("hide");
  renderAuthStats();
}

// ── Task form helpers ─────────────────────────────────────────────────────────
function renderDayChoices() {
  elements.dayChoices.innerHTML = "";
  DAY_ORDER.forEach((day) => {
    const label = document.createElement("label");
    label.className = "choice";
    label.innerHTML = `<input type="checkbox" name="days" value="${day}" checked><span>${day.toUpperCase()}</span>`;
    elements.dayChoices.appendChild(label);
  });
}

function setDefaultScheduleDate() { elements.scheduleDate.value = todayKey(); }
function getTaskType() { return elements.taskForm.querySelector("input[name='taskType']:checked").value; }

function renderTaskTypeControls() {
  const isScheduled = getTaskType() === "scheduled";
  elements.repeatField.classList.toggle("hide", isScheduled);
  elements.scheduleField.classList.toggle("hide", !isScheduled);
  elements.submitTaskBtn.querySelector("span:last-child").textContent = isScheduled ? "Add scheduled task" : "Add daily task";
  if (isScheduled && !elements.scheduleDate.value) setDefaultScheduleDate();
}

function renderAssignDropdown() {
  if (!isAdmin()) return;
  const prev = elements.assignUser.value;
  elements.assignUser.innerHTML = "";
  state.data.users.forEach((u) => {
    const opt = document.createElement("option");
    opt.value = u.id;
    opt.textContent = `${u.name} (${u.username})`;
    elements.assignUser.appendChild(opt);
  });
  elements.assignUser.value = (prev && state.data.users.some((u) => u.id === prev)) ? prev : state.currentUserId;
}

// ── Task data helpers ─────────────────────────────────────────────────────────
function getTasksForUserOnDate(userId, dayKey, dateKey) {
  return state.data.tasks.filter((t) => t.userId === userId &&
    (t.type === "scheduled" ? t.scheduleDate === dateKey : t.days.includes(dayKey)));
}

function getDoneSet(userId, dateKey) {
  return new Set(state.data.completions[dateKey]?.[userId] || []);
}

function getTaskMeta(task) {
  if (task.type === "scheduled") return `Scheduled: ${task.scheduleDate}`;
  return task.days.map((d) => DAY_NAMES[d].slice(0, 3)).join(", ");
}

// ── Render: main app ──────────────────────────────────────────────────────────
function renderApp() {
  const user = currentUser();
  if (!user) return logout();

  elements.authView.classList.add("hide");
  elements.appView.classList.remove("hide");
  elements.welcomeText.textContent = `${user.name} · ${user.role === "admin" ? "Admin" : "User"}`;
  elements.noteOwner.textContent = user.role === "admin" ? "Admin note" : "My note";

  elements.assignField.classList.toggle("hide", !isAdmin());
  if (isAdmin()) renderAssignDropdown();

  renderTasks();
  renderNotes();
  renderAlarm();
  renderAdmin();
}

function renderTasks() {
  const user = currentUser();
  const dateKey = todayKey();
  const dayKey = currentDayKey();
  const todayTasks = getTasksForUserOnDate(user.id, dayKey, dateKey);
  const doneSet = getDoneSet(user.id, dateKey);
  const doneCount = todayTasks.filter((t) => doneSet.has(t.id)).length;
  const percent = todayTasks.length ? Math.round((doneCount / todayTasks.length) * 100) : 0;

  elements.listTitle.textContent = dayKey === "sun" ? "Sunday scheduled work" : `${DAY_NAMES[dayKey]} work`;
  elements.datePill.textContent = formatDate();
  elements.progressText.textContent = `${doneCount} of ${todayTasks.length} done`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressBar.style.width = `${percent}%`;
  elements.emptyState.hidden = todayTasks.length > 0;
  elements.taskList.innerHTML = "";
  elements.summaryList.innerHTML = "";

  todayTasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task${doneSet.has(task.id) ? " done" : ""}`;
    item.innerHTML = `
      <button class="check" type="button" aria-label="Toggle done">${icons.check}</button>
      <div><div class="task-title"></div><div class="task-meta"></div></div>
      <button class="icon-btn" type="button" title="Delete task" aria-label="Delete task">${icons.trash}</button>
    `;
    item.querySelector(".task-title").textContent = task.title;
    item.querySelector(".task-meta").textContent = getTaskMeta(task);
    item.querySelector(".check").addEventListener("click", () => toggleDone(task.id));
    item.querySelector(".icon-btn").addEventListener("click", () => deleteTask(task.id));
    elements.taskList.appendChild(item);
  });

  const completed = todayTasks.filter((t) => doneSet.has(t.id));
  elements.summaryEmpty.hidden = completed.length > 0;
  completed.forEach((task) => {
    const item = document.createElement("li");
    item.innerHTML = `<span class="tick">${icons.check}</span><span></span>`;
    item.querySelector("span:last-child").textContent = task.title;
    elements.summaryList.appendChild(item);
  });
}

function toggleDone(taskId) {
  const user = currentUser();
  const dateKey = todayKey();
  state.data.completions[dateKey] ||= {};
  const done = getDoneSet(user.id, dateKey);
  done.has(taskId) ? done.delete(taskId) : done.add(taskId);
  state.data.completions[dateKey][user.id] = Array.from(done);
  saveData();
  renderTasks();
  renderAdmin();
}

function deleteTask(taskId) {
  const user = currentUser();
  // Admin can delete any task; regular users only their own
  const task = state.data.tasks.find((t) => t.id === taskId && (isAdmin() || t.userId === user.id));
  if (!task || !confirm(`Delete "${task.title}"?`)) return;

  state.data.tasks = state.data.tasks.filter((t) => t.id !== taskId);
  Object.values(state.data.completions).forEach((byUser) => {
    Object.keys(byUser).forEach((uid) => { byUser[uid] = byUser[uid].filter((id) => id !== taskId); });
  });
  saveData();
  renderTasks();
  renderAdmin();
}

function addTask(event) {
  event.preventDefault();
  const user = currentUser();
  const title = elements.taskTitle.value.trim();
  const taskType = getTaskType();
  const days = Array.from(elements.taskForm.querySelectorAll("input[name='days']:checked")).map((i) => i.value);
  const scheduleDate = elements.scheduleDate.value;
  const targetUserId = isAdmin() ? (elements.assignUser.value || user.id) : user.id;

  if (!title) { showStatus(elements.formStatus, "Please enter a task name.", true); elements.taskTitle.focus(); return; }
  if (taskType === "daily" && days.length === 0) { showStatus(elements.formStatus, "Please choose at least one day.", true); return; }
  if (taskType === "scheduled" && !scheduleDate) { showStatus(elements.formStatus, "Please choose a scheduled date.", true); return; }

  const task = {
    id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    userId: targetUserId, title, type: taskType,
    days: taskType === "daily" ? days : [],
    scheduleDate: taskType === "scheduled" ? scheduleDate : undefined,
    createdAt: new Date().toISOString()
  };
  state.data.tasks.push(task);

  elements.taskForm.reset();
  elements.taskForm.querySelector("input[name='taskType'][value='daily']").checked = true;
  elements.taskForm.querySelectorAll("input[name='days']").forEach((i) => { i.checked = true; });
  setDefaultScheduleDate();
  renderTaskTypeControls();
  if (isAdmin()) renderAssignDropdown();

  saveData();
  renderTasks();
  renderAdmin();

  const assignedUser = state.data.users.find((u) => u.id === targetUserId);
  const suffix = isAdmin() && targetUserId !== user.id ? ` for ${assignedUser?.name || "user"}` : "";
  showStatus(elements.formStatus, taskType === "scheduled" ? `Scheduled task added${suffix}.` : `Task added${suffix}.`);
}

// ── Notes ─────────────────────────────────────────────────────────────────────
function getNoteForUser(userId) {
  let note = state.data.notes.find((n) => n.userId === userId);
  if (!note) { note = { id: `note-${userId}`, userId, text: "", updatedAt: "" }; state.data.notes.push(note); }
  return note;
}

function renderNotes() {
  const note = getNoteForUser(currentUser().id);
  elements.noteText.value = note.text;
  elements.noteStatus.textContent = note.updatedAt ? `Saved ${new Date(note.updatedAt).toLocaleString()}` : "Saved automatically";
}

function saveNote() {
  const note = getNoteForUser(currentUser().id);
  note.text = elements.noteText.value;
  note.updatedAt = new Date().toISOString();
  saveData();
  elements.noteStatus.textContent = "Saved";
  window.clearTimeout(saveNote._timer);
  saveNote._timer = window.setTimeout(() => { elements.noteStatus.textContent = `Saved ${new Date(note.updatedAt).toLocaleString()}`; }, 700);
  renderAdmin();
}

// ── Alarm ─────────────────────────────────────────────────────────────────────
function renderAlarm() {
  const user = currentUser();
  const enabled = Boolean(user.alarmEnabled);
  elements.alarmToggle.checked = enabled;
  elements.alarmTitle.textContent = enabled ? "Alarm is on" : "Alarm is off";
  elements.alarmDescription.textContent = enabled
    ? "A reminder will play every hour while this page stays open."
    : "Turn it on to play a reminder every hour while this page is open.";
  elements.alarmStatus.textContent = enabled && user.nextAlarmAt
    ? `Next alarm: ${new Date(user.nextAlarmAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "No alarm scheduled";
  enabled ? startAlarmTimer() : stopAlarmTimer();
}

function toggleAlarm() {
  const user = currentUser();
  user.alarmEnabled = elements.alarmToggle.checked;
  user.nextAlarmAt = user.alarmEnabled ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : "";
  saveData();
  renderAlarm();
  if (user.alarmEnabled) playAlarm("Hourly alarm enabled.");
}

function startAlarmTimer() {
  stopAlarmTimer();
  const user = currentUser();
  if (!user?.alarmEnabled) return;
  let next = user.nextAlarmAt ? new Date(user.nextAlarmAt).getTime() : 0;
  if (!next || Number.isNaN(next) || next <= Date.now()) {
    next = Date.now() + 60 * 60 * 1000;
    user.nextAlarmAt = new Date(next).toISOString();
    saveData();
  }
  const delay = Math.max(1000, Math.min(next - Date.now(), 2147483647));
  state.alarmTimer = window.setTimeout(() => {
    playAlarm("Hourly work reminder.");
    const u = currentUser();
    if (!u?.alarmEnabled) return;
    u.nextAlarmAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    saveData();
    renderAlarm();
  }, delay);
}

function stopAlarmTimer() {
  if (state.alarmTimer) { window.clearTimeout(state.alarmTimer); state.alarmTimer = null; }
}

function playAlarm(message = "Hourly work reminder.") {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) { alert(message); return; }
  state.audioContext ||= new AC();
  if (state.audioContext.state === "suspended") state.audioContext.resume();
  const start = state.audioContext.currentTime;
  [0, 0.28, 0.56].forEach((offset) => {
    const osc = state.audioContext.createOscillator();
    const gain = state.audioContext.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, start + offset);
    osc.frequency.setValueAtTime(660, start + offset + 0.12);
    gain.gain.setValueAtTime(0.0001, start + offset);
    gain.gain.exponentialRampToValueAtTime(0.22, start + offset + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + offset + 0.22);
    osc.connect(gain);
    gain.connect(state.audioContext.destination);
    osc.start(start + offset);
    osc.stop(start + offset + 0.24);
  });
}

// ── Admin overview ────────────────────────────────────────────────────────────
function renderAdminTask(task, doneSet) {
  const isDone = doneSet.has(task.id);
  const item = document.createElement("li");
  item.className = "admin-task";
  item.innerHTML = `
    <div>
      <div class="admin-task-title"></div>
      <div class="admin-task-meta"></div>
    </div>
    <span class="status-pill ${isDone ? "done" : "pending"}"></span>
  `;
  item.querySelector(".admin-task-title").textContent = task.title;
  item.querySelector(".admin-task-meta").textContent = getTaskMeta(task);
  item.querySelector(".status-pill").textContent = isDone ? "Done" : "Pending";
  return item;
}

function renderAdmin() {
  elements.adminPanel.classList.toggle("hide", !isAdmin());
  if (!isAdmin()) return;

  const dateKey = todayKey();
  const dayKey = currentDayKey();
  elements.adminDatePill.textContent = formatDate();
  elements.adminList.innerHTML = "";

  state.data.users.forEach((user) => {
    const tasks = getTasksForUserOnDate(user.id, dayKey, dateKey);
    const doneSet = getDoneSet(user.id, dateKey);
    const doneTasks = tasks.filter((t) => doneSet.has(t.id));
    const note = state.data.notes.find((n) => n.userId === user.id);

    const item = document.createElement("li");
    item.className = "admin-item";
    item.innerHTML = `
      <div class="admin-row">
        <div class="admin-user-info">
          <div class="user-avatar"></div>
          <div>
            <div class="admin-name"></div>
            <div class="admin-meta"></div>
          </div>
        </div>
        <span class="pill"></span>
      </div>
      <ul class="admin-tasks"></ul>
      <div class="admin-note hide"></div>
    `;
    const avatar = item.querySelector(".user-avatar");
    avatar.textContent = getInitials(user.name);
    avatar.style.background = getAvatarColor(user.id);
    item.querySelector(".admin-name").textContent =
      `${user.name} (${user.username})${user.role === "admin" ? " — Admin" : ""}`;
    item.querySelector(".admin-meta").textContent = tasks.length
      ? `${tasks.length} task${tasks.length === 1 ? "" : "s"} assigned today`
      : "No tasks assigned today";
    item.querySelector(".pill").textContent = `${doneTasks.length}/${tasks.length}`;
    const taskList = item.querySelector(".admin-tasks");
    taskList.classList.toggle("hide", tasks.length === 0);
    tasks.forEach((task) => { taskList.appendChild(renderAdminTask(task, doneSet)); });
    if (note?.text?.trim()) {
      const noteEl = item.querySelector(".admin-note");
      noteEl.classList.remove("hide");
      noteEl.textContent = note.text;
    }
    elements.adminList.appendChild(item);
  });
}

// ── Backup / Restore ──────────────────────────────────────────────────────────
function downloadBackup() {
  const blob = new Blob([JSON.stringify(state.data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `daily-task-backup-${todayKey()}.json`; a.click();
  URL.revokeObjectURL(url);
}

function restoreBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state.data = normalizeData(JSON.parse(reader.result));
      if (!state.data.users.some((u) => u.id === state.currentUserId)) state.currentUserId = null;
      saveData();
      renderAuthStats();
      state.currentUserId ? renderApp() : logout();
      alert("Backup restored.");
    } catch { alert("This backup file is not valid JSON."); }
  };
  reader.readAsText(file);
  elements.restoreFile.value = "";
}

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  state.data = await loadData();
  saveData(); // persist to localStorage (and file if connected) on first load

  renderIcons();
  renderDayChoices();
  setDefaultScheduleDate();
  renderTaskTypeControls();
  renderAuthStats();
  setFileStatus(state.fileHandle ? "connected" : "disconnected");
  state.currentUserId ? renderApp() : logout();

  elements.loginTab.addEventListener("click", () => setAuthMode("login"));
  elements.registerTab.addEventListener("click", () => setAuthMode("register"));
  elements.loginForm.addEventListener("submit", login);
  elements.registerForm.addEventListener("submit", register);
  elements.taskForm.addEventListener("submit", addTask);
  elements.taskForm.querySelectorAll("input[name='taskType']").forEach((i) => i.addEventListener("change", renderTaskTypeControls));
  elements.noteText.addEventListener("input", saveNote);
  elements.alarmToggle.addEventListener("change", toggleAlarm);
  elements.testAlarmBtn.addEventListener("click", () => playAlarm("Test alarm."));
  elements.backupBtn.addEventListener("click", downloadBackup);
  elements.restoreBtn.addEventListener("click", () => elements.restoreFile.click());
  elements.restoreFile.addEventListener("change", (e) => restoreBackup(e.target.files[0]));
  elements.connectFileBtn.addEventListener("click", connectDataFile);
  elements.logoutBtn.addEventListener("click", logout);
}

init();
