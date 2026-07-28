document.addEventListener("DOMContentLoaded", () => {
    // 1. URL Parameters Parsing
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side');      // 'groom' or 'bride'
    const eventType = urlParams.get('event'); // 'wedding', 'homecoming', or 'both'
    const guestNameParam = urlParams.get('guest'); // Salutation + Guest Name (e.g., "Mr. Perera & Family")

    // Element References
    const guestGreeting = document.getElementById("personalizedGuestName");
    const weddingBlock = document.getElementById("weddingDetailsBlock");
    const homecomingBlock = document.getElementById("homecomingDetailsBlock");
    const groomContacts = document.getElementById("groomContacts");
    const brideContacts = document.getElementById("brideContacts");

    // 2. Set Personalized Guest Name
    if (guestNameParam) {
        guestGreeting.textContent = `Dear ${decodeURIComponent(guestNameParam)}`;
    } else {
        guestGreeting.textContent = "Dear Valued Guest";
    }

    // 3. Dynamic Event Display (Hide/Show Wedding vs Homecoming vs Countdown)
    if (eventType === 'wedding') {
        // Show Wedding, Hide Homecoming entirely
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "none";
    } else if (eventType === 'homecoming') {
        // Show Homecoming, Hide Wedding entirely
        if (weddingBlock) weddingBlock.style.display = "none";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    } else {
        // Show Both Events
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    }

    // 4. Dynamic RSVP Contact Info (Groom vs Bride Side)
    if (side === 'bride') {
        if (brideContacts) brideContacts.style.display = "block";
        if (groomContacts) groomContacts.style.display = "none";
    } else {
        // Default to Groom side
        if (groomContacts) groomContacts.style.display = "block";
        if (brideContacts) brideContacts.style.display = "none";
    }

    // 5. Form Submit Handler for RSVP
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const guestCount = document.getElementById("guestCount").value;
            const currentGuestName = guestNameParam ? decodeURIComponent(guestNameParam) : "Guest";

            // Target Phone Number based on Side
            const targetPhone = (side === 'bride') ? "94713372644" : "94752540988";

            let message = `Hello! RSVP Confirmation from *${currentGuestName}*:\n\n`;
            if (attendance === 'Attending') {
                message += `Status: ✅ We Will Attend\nNumber of Guests: ${guestCount}`;
            } else {
                message += `Status: ❌ Cannot Attend`;
            }

            const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank");
        });
    }
});

// Toggle Guest Count Display
function toggleGuestCount(willAttend) {
    const guestCountBox = document.getElementById('guestCountBox');
    if (guestCountBox) {
        guestCountBox.style.display = willAttend ? 'block' : 'none';
    }
}
