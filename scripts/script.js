
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
        { name: "SCP-049.json", lastModified: "2025-07-01 10:23", locked: false },
        { name: "SCP-173.json", lastModified: "2025-07-15 14:09", locked: false },
        { name: "SCP-999.json", lastModified: "2025-07-28 16:52", locked: true },
        { name: "SCP-████.json", lastModified: "REDACTED", locked: true }
    ];

    const list = document.getElementById("archive-list");
    list.innerHTML = "";
    files.forEach(file => {
        const item = document.createElement("div");
        item.className = "archive-item" + (file.locked ? " locked" : "");
        item.innerHTML = `
            <span>${file.name}</span>
            <span>${file.lastModified}</span>
        `;
        if (!file.locked) {
            item.onclick = () => alert("Opening file: " + file.name);
        }
        list.appendChild(item);
    });

    setInterval(() => {
        document.getElementById("loader").innerText =
            "Connection to Foundation-512 is being re-established...";
        setTimeout(() => {
            document.getElementById("loader").innerText = "";
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
