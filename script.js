(() => {
  "use strict";

  const STORAGE_KEY = "taskflow.tasks.v1";
  const THEME_KEY = "taskflow.theme";

  /*
   * This small function finds an HTML element by its id.
   * Example: get("taskForm") finds id="taskForm".
   */
  function get(id) {
    return document.getElementById(id);
  }

  /*
   * Store page elements in one place.
   * They are divided into groups to make the code easy to understand.
   */
  const elements = {
    // Add-task form
    taskForm: get("taskForm"),
    taskInput: get("taskInput"),
    dueDateInput: get("dueDateInput"),
    priorityInput: get("priorityInput"),

    // Task list
    taskList: get("taskList"),
    taskTemplate: get("taskTemplate"),
    emptyState: get("emptyState"),
    emptyTitle: get("emptyTitle"),
    emptyMessage: get("emptyMessage"),

    // Filters and search
    searchInput: get("searchInput"),
    sortSelect: get("sortSelect"),
    tabs: Array.from(document.getElementsByClassName("tab")),

    // Task numbers and progress
    allCount: get("allCount"),
    activeCount: get("activeCount"),
    completedCount: get("completedCount"),
    remainingCount: get("remainingCount"),
    remainingLabel: get("remainingLabel"),
    clearCompletedBtn: get("clearCompletedBtn"),
    progressRing: get("progressRing"),
    progressPercent: get("progressPercent"),
    progressTitle: get("progressTitle"),
    progressDetail: get("progressDetail"),

    // Header
    themeToggle: get("themeToggle"),
    todayText: get("todayText"),

    // Edit-task popup
    editModal: get("editModal"),
    editForm: get("editForm"),
    editTaskInput: get("editTaskInput"),
    editDueDate: get("editDueDate"),
    editPriority: get("editPriority"),
    closeModalBtn: get("closeModalBtn"),
    cancelEditBtn: get("cancelEditBtn"),

    // Notification message
    toast: get("toast"),
    toastText: get("toastText")
  };

  let tasks = loadTasks();
  let currentFilter = "all";
  let editingId = null;
  let toastTimer = null;

  function loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function createId() {
    return crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function addTask(title, dueDate, priority) {
    tasks.unshift({
      id: createId(),
      title: title.trim(),
      dueDate,
      priority,
      completed: false,
      createdAt: Date.now()
    });
    saveTasks();
    render();
    showToast("Task added to your list");
  }

  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    render();
    showToast("Task deleted");
  }

  function toggleTask(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    render();
  }

  function updateTask(id, updates) {
    tasks = tasks.map(task => task.id === id ? { ...task, ...updates } : task);
    saveTasks();
    render();
    showToast("Changes saved");
  }

  function filteredTasks() {
    const query = elements.searchInput.value.trim().toLowerCase();
    let result = tasks.filter(task => {
      const matchesFilter =
        currentFilter === "all" ||
        (currentFilter === "active" && !task.completed) ||
        (currentFilter === "completed" && task.completed);
      return matchesFilter && task.title.toLowerCase().includes(query);
    });

    const priorityWeight = { high: 3, normal: 2, low: 1 };
    result = [...result].sort((a, b) => {
      switch (elements.sortSelect.value) {
        case "oldest": return a.createdAt - b.createdAt;
        case "due":
          return (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31");
        case "priority": return priorityWeight[b.priority] - priorityWeight[a.priority];
        default: return b.createdAt - a.createdAt;
      }
    });
    return result;
  }

  function render() {
    const visibleTasks = filteredTasks();
    elements.taskList.replaceChildren();
    visibleTasks.forEach((task, index) => {
      const fragment = elements.taskTemplate.content.cloneNode(true);
      const item = fragment.querySelector(".task-item");
      const check = fragment.querySelector(".check-btn");
      const title = fragment.querySelector(".task-title");
      const meta = fragment.querySelector(".task-meta");

      item.dataset.id = task.id;
      item.style.animationDelay = `${Math.min(index * 35, 180)}ms`;
      item.classList.toggle("completed", task.completed);
      title.textContent = task.title;
      check.setAttribute("aria-label", task.completed ? "Mark task active" : "Mark task complete");

      if (task.dueDate) {
        const due = document.createElement("span");
        const isOverdue = !task.completed && task.dueDate < localDateString(new Date());
        due.className = `meta-tag${isOverdue ? " overdue" : ""}`;
        due.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></svg><span>${escapeHTML(formatDueDate(task.dueDate))}</span>`;
        meta.append(due);
      }

      const priority = document.createElement("span");
      priority.className = `priority-tag priority-${task.priority}`;
      priority.textContent = task.priority;
      meta.append(priority);

      fragment.querySelector(".check-btn").addEventListener("click", () => toggleTask(task.id));
      fragment.querySelector(".edit-action").addEventListener("click", () => openEditModal(task.id));
      fragment.querySelector(".delete-action").addEventListener("click", () => deleteTask(task.id));
      elements.taskList.append(fragment);
    });

    updateStats();
    updateEmptyState(visibleTasks.length);
  }

  function updateStats() {
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;
    const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    elements.allCount.textContent = tasks.length;
    elements.activeCount.textContent = active;
    elements.completedCount.textContent = completed;
    elements.remainingCount.textContent = active;
    elements.remainingLabel.textContent = active === 1 ? "task remaining" : "tasks remaining";
    elements.clearCompletedBtn.disabled = completed === 0;
    elements.progressRing.style.setProperty("--progress", `${percentage * 3.6}deg`);
    elements.progressPercent.textContent = `${percentage}%`;

    if (!tasks.length) {
      elements.progressTitle.textContent = "Fresh start";
      elements.progressDetail.textContent = "Add your first task";
    } else if (percentage === 100) {
      elements.progressTitle.textContent = "All done!";
      elements.progressDetail.textContent = "Beautiful work today";
    } else {
      elements.progressTitle.textContent = percentage >= 50 ? "Great momentum" : "Keep it moving";
      elements.progressDetail.textContent = `${completed} of ${tasks.length} completed`;
    }
  }

  function updateEmptyState(visibleCount) {
    const isEmpty = visibleCount === 0;
    elements.emptyState.hidden = !isEmpty;
    elements.taskList.hidden = isEmpty;

    if (elements.searchInput.value.trim()) {
      elements.emptyTitle.textContent = "No matching tasks";
      elements.emptyMessage.textContent = "Try a different search phrase.";
    } else if (currentFilter === "active" && tasks.length) {
      elements.emptyTitle.textContent = "Nothing left to do";
      elements.emptyMessage.textContent = "Every task is complete. Nicely done.";
    } else if (currentFilter === "completed") {
      elements.emptyTitle.textContent = "No completed tasks yet";
      elements.emptyMessage.textContent = "Completed tasks will appear here.";
    } else {
      elements.emptyTitle.textContent = "Your list is clear";
      elements.emptyMessage.textContent = "Add a task above and take the first small step.";
    }
  }

  function openEditModal(id) {
    const task = tasks.find(item => item.id === id);
    if (!task) return;
    editingId = id;
    elements.editTaskInput.value = task.title;
    elements.editDueDate.value = task.dueDate;
    elements.editPriority.value = task.priority;
    elements.editModal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => elements.editTaskInput.focus());
  }

  function closeEditModal() {
    elements.editModal.hidden = true;
    document.body.style.overflow = "";
    editingId = null;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    elements.toastText.textContent = message;
    elements.toast.classList.add("show");
    toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2200);
  }

  function formatDueDate(dateString) {
    const today = localDateString(new Date());
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = localDateString(tomorrowDate);
    if (dateString === today) return "Today";
    if (dateString === tomorrow) return "Tomorrow";
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: dateString.slice(0, 4) !== today.slice(0, 4) ? "numeric" : undefined })
      .format(new Date(`${dateString}T12:00:00`));
  }

  function localDateString(date) {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
  }

  function escapeHTML(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  elements.taskForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = elements.taskInput.value.trim();
    if (!title) return;
    addTask(title, elements.dueDateInput.value, elements.priorityInput.value);
    elements.taskForm.reset();
    elements.priorityInput.value = "normal";
    elements.taskInput.focus();
  });

  elements.tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      currentFilter = tab.dataset.filter;
      elements.tabs.forEach(item => item.classList.toggle("active", item === tab));
      render();
    });
  });

  elements.searchInput.addEventListener("input", render);
  elements.sortSelect.addEventListener("change", render);

  elements.clearCompletedBtn.addEventListener("click", () => {
    const completedCount = tasks.filter(task => task.completed).length;
    if (!completedCount) return;
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    render();
    showToast(`${completedCount} completed ${completedCount === 1 ? "task" : "tasks"} cleared`);
  });

  elements.editForm.addEventListener("submit", event => {
    event.preventDefault();
    const title = elements.editTaskInput.value.trim();
    if (!title || !editingId) return;
    updateTask(editingId, {
      title,
      dueDate: elements.editDueDate.value,
      priority: elements.editPriority.value
    });
    closeEditModal();
  });

  elements.closeModalBtn.addEventListener("click", closeEditModal);
  elements.cancelEditBtn.addEventListener("click", closeEditModal);
  elements.editModal.addEventListener("click", event => {
    if (event.target === elements.editModal) closeEditModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !elements.editModal.hidden) closeEditModal();
  });

  elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, document.body.classList.contains("dark") ? "dark" : "light");
  });

  const preferredTheme = localStorage.getItem(THEME_KEY);
  if (preferredTheme === "dark" || (!preferredTheme && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
  }

  elements.todayText.textContent = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date());

  render();
})();