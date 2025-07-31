
document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("scp-list");
  if (list) {
    fetch("scp_data.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((scp) => {
          const item = document.createElement("li");
          item.innerHTML = `<a href="#" onclick="viewSCP('${scp.id}')">${scp.id}</a>`;
          list.appendChild(item);
        });
      });
  }
});

function viewSCP(id) {
  fetch("scp_data.json")
    .then((res) => res.json())
    .then((data) => {
      const scp = data.find((s) => s.id === id);
      if (scp) {
        alert(`${scp.id}\n\n${scp.title}\n\n${scp.content}`);
      }
    });
}
