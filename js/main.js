
async function loadPage(page) {
    const response = await fetch(`js/pages/${page}.html`);
    const content = await response.text();
    document.getElementById('content').innerHTML = content;

    if (page === 'files') {
        loadSCPs();
    }
}

async function loadSCPs() {
    const response = await fetch('data/scp_data.json');
    const scps = await response.json();
    const container = document.createElement('div');

    scps.scp_entries.forEach(scp => {
        const scpDiv = document.createElement('div');
        scpDiv.className = "scp-entry";
        scpDiv.innerHTML = `<h3>${scp.id}: ${scp.title}</h3>
                            <img src="${scp.image}" alt="SCP Image" width="200">
                            <p>${scp.description}</p>`;
        container.appendChild(scpDiv);
    });

    document.getElementById('content').appendChild(container);
}
