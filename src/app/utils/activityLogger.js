export function logActivity(message) {
  const logs = JSON.parse(localStorage.getItem("activityLogs")) || [];

  logs.unshift({
    message,
    time: new Date().toLocaleString(),
  });

  localStorage.setItem("activityLogs", JSON.stringify(logs));
}
