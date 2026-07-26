document.addEventListener("DOMContentLoaded", () => {

    const baseUrl = "https://chathurnijayarathne451-maker.github.io/-WEDDING-WEBSITE/";

    const senderType = document.getElementById('senderType');
    const guestInput = document.getElementById('guestInput');
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const messageOutput = document.getElementById('messageOutput');
    const copyBtn = document.getElementById('copyBtn');
    const waSendBtn = document.getElementById('waSendBtn');

    generateBtn.addEventListener('click', () => {
        const guestName = guestInput.value.trim();
        const sender = senderType.value;

        if (!guestName) {
            alert("කරුණාකර Guest Name එක ඇතුළත් කරන්න.");
            return;
        }

        // Generate Custom URL
        const eventType = sender === 'bride' ? 'wedding' : 'homecoming';
        const customUrl = `${baseUrl}?guest=${encodeURIComponent(guestName)}&event=${eventType}`;

        // Sender Name
        const senderName = sender === 'bride' ? 'Chathurni Sanchala' : 'Ashen Anuradha';

        // Draft Message Layout
        const fullMessage = `Dear ${guestName} ✨💌\n\nWith hearts overflowing with love and gratitude,\n\nwe are delighted to invite you to witness the beginning of our forever 💍❤️\n\nPlease open our wedding invitation below 👇\n\n${customUrl}\n\nYour presence and blessings mean the world to us 🌹\n\nCome celebrate love, laughter, and a lifetime of happiness with us 🥂✨\n\nCan’t wait to see you there,\n\nWith all our love,\n\n${senderName}`;

        messageOutput.value = fullMessage;
        outputSection.style.display = 'block';
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        messageOutput.select();
        document.execCommand('copy');
        alert("Message copied to clipboard!");
    });

    // Direct WhatsApp Share
    waSendBtn.addEventListener('click', () => {
        const encodedMsg = encodeURIComponent(messageOutput.value);
        window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, '_blank');
    });

});
