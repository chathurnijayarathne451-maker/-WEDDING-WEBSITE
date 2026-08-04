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
// Custom Message Output Template (Without Direct Emojis to Avoid Encoding Issues)
        const customMessage = "Dear " + fullGuestTitle + " \u2728\u2709\uFE0F\n\n" +
            "With hearts overflowing with love and gratitude, \n" +
            "we are delighted to invite you to witness the beginning of our forever \u1F48D\u2764\uFE0F\n\n" +
            "Please open our wedding invitation below \u1F447\n" +
            generatedLink + "\n\n" +
            "Your presence and blessings mean the world to us \u1F339\n" +
            "Come celebrate love, laughter, and a lifetime of happiness with us \u1F242\u2728\n\n" +
            "Can\u2019t wait to see you there,\n" +
            "With all our love,\n" +
            senderDisplayName;

        // Set message
        messageOutput.value = customMessage;
        outputSection.style.display = "block";

        // Setup WhatsApp URL with Encoded Message
        const encodedMsg = encodeURIComponent(customMessage);
        if (phone) {
            finalWhatsAppUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
            waSendBtn.style.display = "block";
        } else {
            finalWhatsAppUrl = `https://api.whatsapp.com/send?text=${encodedMsg}`;
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
