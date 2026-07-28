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
        const eventType = document.getElementById("eventType").value;
        let phone = document.getElementById("phoneInput").value.trim();

        if (!guestName) {
            alert("කරුණාකර Guest Name එක ඇතුළත් කරන්න!");
            return;
        }

        // Clean up phone number (Removes spaces, +, etc.)
        phone = phone.replace(/[^0-9]/g, '');

        // Construct base URL dynamically for index.html
        const baseUrl = window.location.href.replace('admin.html', 'index.html').split('?')[0];

        // Create Dynamic Invitation URL with Parameters
        const generatedLink = `${baseUrl}?side=${sender}&event=${eventType}&sal=${encodeURIComponent(salutation)}&guest=${encodeURIComponent(guestName)}`;

        // Determine Sender Display Name
        const senderDisplayName = (sender === 'groom') ? 'Ashen Anuradha' : 'Sanchala Jayarathne';

        // Custom Invitation Text Message Template
        const customMessage = `Dear ${salutation} ${guestName} ✨💌\n\nWith hearts overflowing with love and gratitude, \nwe are delighted to invite you to witness the beginning of our forever 💍❤️\n\nPlease open our wedding invitation below 👇\n${generatedLink}\n\nYour presence and blessings mean the world to us 🌹\nCome celebrate love, laughter, and a lifetime of happiness with us 🥂✨\n\nCan’t wait to see you there,\nWith all our love,\n${senderDisplayName}`;

        // Set message to textarea
        messageOutput.value = customMessage;
        outputSection.style.display = "block";

        // Store WhatsApp URL
        if (phone) {
            finalWhatsAppUrl = `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`;
            waSendBtn.style.display = "block";
        } else {
            finalWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(customMessage)}`;
        }
    });

    // Copy to Clipboard Functionality
    copyBtn.addEventListener("click", () => {
        messageOutput.select();
        document.execCommand("copy");
        alert("Message copied to clipboard!");
    });

    // WhatsApp Direct Send Button Functionality
    waSendBtn.addEventListener("click", () => {
        if (finalWhatsAppUrl) {
            window.open(finalWhatsAppUrl, "_blank");
        } else {
            alert("කරුණාකර පළමුව Message එක Generate කරගන්න.");
        }
    });
});
