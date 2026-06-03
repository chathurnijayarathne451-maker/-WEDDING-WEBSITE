document.getElementById("linkForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("gName").value;
    const type = document.getElementById("gType").value;
    const event = document.getElementById("gEvent").value;
    const side = document.getElementById("gSide").value;
    const id = "G" + Date.now().toString().slice(-6); 

    let guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    guests.push({ id, name, type, event, side });
    localStorage.setItem("wedding_guests", JSON.stringify(guests));

    const baseUrl = window.location.href.replace("admin.html", "index.html");
    const finalUrl = `${baseUrl}?id=${id}&guest=${encodeURIComponent(name)}&type=${type}&event=${event}&side=${side}`;

    document.getElementById("generatedLink").value = finalUrl;
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("gName").value = ""; 
    renderDashboard();
});

document.getElementById("copyBtn").addEventListener("click", function() {
    const linkInput = document.getElementById("generatedLink");
    linkInput.select();
    document.execCommand("copy");
    alert("Invitation Link Copied Successfully!");
});

function renderDashboard() {
    const guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    const tracking = JSON.parse(localStorage.getItem("invitation_tracking")) || {};
    const rsvp = JSON.parse(localStorage.getItem("invitation_rsvp")) || {};

    const tbody = document.getElementById("guestTableBody");
    tbody.innerHTML = "";

    let openedCount = 0;
    let attendingCount = 0;

    guests.forEach(g => {
        const isOpened = tracking[g.id] ? "Opened" : "Pending";
        const rsvpStatus = rsvp[g.id] || "No Response";

        if (isOpened === "Opened") openedCount++;
        if (rsvpStatus === "Attending") attendingCount++;

        const row = `<tr>
            <td>${g.id}</td>
            <td>${g.name}</td>
            <td>${g.type}</td>
            <td>${g.event}</td>
            <td>${g.side}</td>
            <td><span class="badge ${isOpened === 'Opened' ? 'opened' : 'pending'}">${isOpened}</span></td>
            <td><span class="badge ${rsvpStatus === 'Attending' ? 'attending' : 'pending'}">${rsvpStatus}</span></td>
        </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById("statTotal").innerText = guests.length;
    document.getElementById("statOpened").innerText = openedCount;
    document.getElementById("statAttending").innerText = attendingCount;
}

document.getElementById("exportBtn").addEventListener("click", function() {
    const guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    const tracking = JSON.parse(localStorage.getItem("invitation_tracking")) || {};
    const rsvp = JSON.parse(localStorage.getItem("invitation_rsvp")) || {};

    if (guests.length === 0) {
        alert("No guest records found to export.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,ID,Name,Type,Event,Side,Tracking,RSVP Status\n";

    guests.forEach(g => {
        const isOpened = tracking[g.id] ? "Opened" : "Pending";
        const rsvpStatus = rsvp[g.id] || "No Response";
        csvContent += `${g.id},"${g.name}",${g.type},${g.event},${g.side},${isOpened},${rsvpStatus}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Wedding_Guest_List_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

window.onload = renderDashboard;