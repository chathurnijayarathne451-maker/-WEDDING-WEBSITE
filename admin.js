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

        // Custom Message Output Template
        const customMessage = `Dear ${fullGuestTitle} ✨💌\n\nWith hearts overflowing with love and gratitude, \nwe are delighted to invite you to witness the beginning of our forever 💍❤️\n\nPlease open our wedding invitation below 👇\n${generatedLink}\n\nYour presence and blessings mean the world to us 🌹\nCome celebrate love, laughter, and a lifetime of happiness with us 🥂✨\n\nCan’t wait to see you there,\nWith all our love,\n${senderDisplayName}`;

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
