document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const outputSection = document.getElementById("outputSection");
    const messageOutput = document.getElementById("messageOutput");
    const copyBtn = document.getElementById("copyBtn");
    const waSendBtn = document.getElementById("waSendBtn");

    let finalWhatsAppUrl = "";

    generateBtn.addEventListener("click", () => {
        const sender = document.getElementById("senderType").value;
        const salutation = document.getElementById("salutationInput").value;
        const guestName = document.getElementById("guestInput").value.trim();
        const includeFamily = document.getElementById("includeFamily").checked;
        const eventType = document.getElementById("eventType").value;
        let phone = document.getElementById("phoneInput").value.trim();

        if (!guestName) {
            alert("කරුණාකර Guest Name එක ඇතුළත් කරන්න!");
            return;
        }

        // Clean up phone number
        phone = phone.replace(/[^0-9]/g, '');

        // Formulate Full Salutation & Name Format (Ex: Mr. Jayarathne & Family)
        let fullGuestTitle = `${salutation} ${guestName}`;
        if (includeFamily) {
            fullGuestTitle += " & Family";
        }

        // Base URL
        const baseUrl = window.location.href.replace('admin.html', 'index.html').split('?')[0];

      // Create Dynamic Invitation URL
        const generatedLink = `${baseUrl}?side=${sender}&event=${eventType}&guest=${encodeURIComponent(fullGuestTitle)}`;

// Determine Sender Display Name
        const senderDisplayName = (sender === 'groom') ? 'Ashen Anuradha' : 'Sanchala Jayarathne';

        // Determine Event Display Text
        let eventText = "our wedding ceremony 💍❤️";
        if (eventType === 'homecoming') {
            eventText = "our homecoming celebration 🏡✨";
        } else if (eventType === 'both') {
            eventText = "our wedding & homecoming celebrations 💍🏡✨";
        }

        // Custom Message Output Template
        const customMessage = `Dear ${fullGuestTitle} ✨💌\n\nWith hearts overflowing with love and gratitude,\nwe are delighted to invite you to ${eventText}\n\nPlease open our wedding invitation below 👇\n${generatedLink}\n\nYour presence and blessings mean the world to us 🌹\nCome celebrate love, laughter, and a lifetime of happiness with us 🥂✨\n\nCan’t wait to see you there,\nWith all our love,\n${senderDisplayName}`;

        // Set message
        messageOutput.value = customMessage;
        outputSection.style.display = "block";

        // Setup WhatsApp URL
        if (phone) {
            finalWhatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
            waSendBtn.style.display = "block";
        } else {
            finalWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(customMessage)}`;
        }

    });

    copyBtn.addEventListener("click", () => {
        messageOutput.select();
        document.execCommand("copy");
        alert("Message copied to clipboard!");
    });

    waSendBtn.addEventListener("click", () => {
        if (finalWhatsAppUrl) {
            window.open(finalWhatsAppUrl, "_blank");
        } else {
            alert("කරුණාකර පළමුව Message එක Generate කරගන්න.");
        }
    });
});
// Local Storage Tracking Management
document.addEventListener("DOMContentLoaded", () => {
    loadTrackingData();
    
    // Auto-Save when message is generated
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const guestName = document.getElementById('guestInput')?.value;
            const salutation = document.getElementById('salutationInput')?.value || '';
            const includeFamily = document.getElementById('includeFamily')?.checked;
            const sender = document.getElementById('senderType')?.value || 'groom';
            const eventType = document.getElementById('eventType')?.value || 'wedding';
            const phone = document.getElementById('phoneInput')?.value || '';
            
            if (guestName) {
                let fullTitle = `${salutation} ${guestName}`.trim();
                if (includeFamily) fullTitle += " & Family";
                
                // Save to tracking list
                saveGuestToTracking(fullTitle, sender, eventType, phone);
            }
        });
    }
});

// Save Guest Data to Browser Local Storage
function saveGuestToTracking(guestName, side, event, phone) {
    let guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    
    // Check if guest already exists
    let existingIndex = guests.findIndex(g => g.name === guestName && g.side === side);
    
    if (existingIndex > -1) {
        guests[existingIndex].phone = phone;
        guests[existingIndex].event = event;
    } else {
        guests.push({
            id: Date.now(),
            name: guestName,
            side: side,
            event: event,
            phone: phone,
            status: "Sent 📤"
        });
    }
    
    localStorage.setItem("wedding_guests", JSON.stringify(guests));
    loadTrackingData();
}

// Render Tracking Table Data
function loadTrackingData() {
    const tableBody = document.getElementById("trackingTableBody");
    if (!tableBody) return;
    
    let guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    tableBody.innerHTML = "";
    
    if (guests.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 15px; color: #777;">No invitations generated yet.</td></tr>`;
        return;
    }
    
    guests.forEach((g) => {
        let row = document.createElement("tr");
        row.style.borderBottom = "1px solid #eee";
        
        row.innerHTML = `
            <td style="padding: 10px;"><strong>${g.name}</strong></td>
            <td style="padding: 10px;">${g.side.toUpperCase()}</td>
            <td style="padding: 10px;">${g.event}</td>
            <td style="padding: 10px;">${g.phone || 'N/A'}</td>
            <td style="padding: 10px;">
                <select onchange="updateStatus(${g.id}, this.value)" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #ccc; font-size: 12px;">
                    <option value="Sent 📤" ${g.status === 'Sent 📤' ? 'selected' : ''}>Sent 📤</option>
                    <option value="Opened 👁️" ${g.status === 'Opened 👁️' ? 'selected' : ''}>Opened 👁️</option>
                    <option value="Attending ✅" ${g.status === 'Attending ✅' ? 'selected' : ''}>Attending ✅</option>
                    <option value="Declined ❌" ${g.status === 'Declined ❌' ? 'selected' : ''}>Declined ❌</option>
                </select>
            </td>
            <td style="padding: 10px;">
                <button onclick="deleteGuest(${g.id})" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update Status Handler
function updateStatus(id, newStatus) {
    let guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    let guest = guests.find(g => g.id === id);
    if (guest) {
        guest.status = newStatus;
        localStorage.setItem("wedding_guests", JSON.stringify(guests));
    }
}

// Delete Guest Handler
function deleteGuest(id) {
    let guests = JSON.parse(localStorage.getItem("wedding_guests")) || [];
    guests = guests.filter(g => g.id !== id);
    localStorage.setItem("wedding_guests", JSON.stringify(guests));
    loadTrackingData();
}
