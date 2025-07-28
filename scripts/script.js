
const allowedUsers = ["User1", "User2", "User3", "User4", "User5"];
const password = "90105";

function login() {
  const username = document.getElementById("username").value;
  const pwd = document.getElementById("password").value;
  const denied = document.getElementById("access-denied");
  const granted = document.getElementById("access-granted");

  if (allowedUsers.includes(username) && pwd === password) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("loader").classList.remove("active");
    granted.play();
    document.documentElement.requestFullscreen();
    loadFiles();
  } else {
    denied.play();
    alert("ACCESS DENIED");
  }
}

function loadFiles() {
  const files = [
    { name: "SCP-049.json", modified: "2025-07-01 10:23", locked: false },
    { name: "SCP-173.json", modified: "2025-07-15 14:09", locked: false },
    { name: "SCP-682.json", modified: "2025-07-20 12:44", locked: true },
    { name: "SCP-███.json", modified: "REDACTED", locked: true }
  ];

  const list = document.getElementById("archive-list");
  list.innerHTML = "";

  files.forEach(file => {
    const item = document.createElement("div");
    item.className = "archive-item" + (file.locked ? " locked" : "");
    item.innerHTML = `
      <span>${file.name}</span>
      <span>${file.modified}</span>
    `;
    if (!file.locked) {
      item.onclick = () => {
        document.getElementById("preview-area").innerHTML = "<pre>Loading content for " + file.name + "...</pre>";
      };
    }
    list.appendChild(item);
  });

  setInterval(() => {
    const loader = document.getElementById("loader");
    loader.innerText = "Connection to Foundation-512 is being re-established...";
    loader.classList.add("active");
    setTimeout(() => {
      loader.classList.remove("active");
    }, 3000);
  }, 30000);
}

function filterFiles() {
  const term = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll(".archive-item");
  items.forEach(item => {
    const name = item.children[0].innerText.toLowerCase();
    item.style.display = name.includes(term) ? "" : "none";
  });
}
