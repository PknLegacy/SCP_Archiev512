
const allowedUsers = [
  "PknLegacy",
  "Guest",
  "User3",
  "User4",
  "User5"
];
const correctPassword = "90105";

function login() {
  const user = document.getElementById("usernameInput").value.trim();
  const pass = document.getElementById("passwordInput").value.trim();
  const status = document.getElementById("loginStatus");
  const successSound = document.getElementById("loginSound");
  const failSound = document.getElementById("failSound");

  if (!allowedUsers.includes(user)) {
    status.textContent = "Unknown user.";
    failSound.play();
    return;
  }
  if (pass !== correctPassword) {
    status.textContent = "Incorrect password.";
    failSound.play();
    return;
  }

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("mainInterface").style.display = "block";
  successSound.play();
}

async function loadFile(path) {
  const output = document.getElementById("fileOutput");
  const loader = document.getElementById("loader");
  output.textContent = "";
  loader.style.display = "block";

  try {
    const res = await fetch(path);
    const data = await res.json();
    setTimeout(() => {
      loader.style.display = "none";
      output.textContent = formatSCP(data);
    }, 1000);
  } catch (e) {
    loader.style.display = "none";
    output.textContent = "Failed to load file.";
  }
}

function formatSCP(data) {
  return `== [${data.id}] ${data.title} ==

• Classification: ${data.class}
• Location: ${data.location}
• Origin: ${data.origin}
• Properties: ${data.properties}

Description:
${data.description}`;
}
