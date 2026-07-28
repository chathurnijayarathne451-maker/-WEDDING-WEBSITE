// ==========================================
// 1. PRELOADER / LOADING SCREEN HIDING LOGIC
// ==========================================

// Function to safely hide the preloader
function hidePreloader() {
    const preloader = document.getElementById("preloader") || document.getElementById("loading-screen");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.transition = "opacity 0.5s ease";
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
}

// Window load event (when all images, styles, and assets are fully loaded)
window.addEventListener("load", () => {
    hidePreloader();
});

// Fallback: Forcefully hide preloader after 3 seconds if load event didn't fire
setTimeout(() => {
    hidePreloader();
}, 3000);


// ==========================================
// 2. DYNAMIC INVITATION & RSVP LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side');           // 'groom' or 'bride'
    const eventType = urlParams.get('event');      // 'wedding', 'homecoming', or 'both'
    const guestNameParam = urlParams.get('guest'); // Guest Name (e.g., "Mr. Jayarathne & Family")

    // DOM Element References
    const guestGreeting = document.getElementById("personalizedGuestName");
    const weddingBlock = document.getElementById("weddingDetailsBlock");
    const homecomingBlock = document.getElementById("homecomingDetailsBlock");
    const groomContacts = document.getElementById("groomContacts");
    const brideContacts = document.getElementById("brideContacts");

    // 2. Personalized Guest Greeting
    if (guestGreeting) {
        if (guestNameParam) {
            guestGreeting.textContent = `Dear ${decodeURIComponent(guestNameParam)}`;
        } else {
            guestGreeting.textContent = "Dear Valued Guest";
        }
    }

    // 3. Dynamic Event Display (Hide / Show Wedding vs Homecoming)
    if (eventType === 'wedding') {
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "none";
    } else if (eventType === 'homecoming') {
        if (weddingBlock) weddingBlock.style.display = "none";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    } else {
        // Show Both Events (Default)
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    }

    // 4. Dynamic RSVP Contacts Display (Groom vs Bride)
    if (side === 'bride') {
        if (brideContacts) brideContacts.style.display = "block";
        if (groomContacts) groomContacts.style.display = "none";
    } else {
        // Default to Groom
        if (groomContacts) groomContacts.style.display = "block";
        if (brideContacts) brideContacts.style.display = "none";
    }

    // 5. RSVP Form Submission via WhatsApp
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
            const attendance = attendanceRadio ? attendanceRadio.value : 'Attending';
            const guestCount = document.getElementById("guestCount") ? document.getElementById("guestCount").value : '1';
            const currentGuestName = guestNameParam ? decodeURIComponent(guestNameParam) : "Guest";

            // Target WhatsApp Number based on side
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

// Toggle Guest Count Field Visibility
function toggleGuestCount(willAttend) {
    const guestCountBox = document.getElementById('guestCountBox');
    if (guestCountBox) {
        guestCountBox.style.display = willAttend ? 'block' : 'none';
    }
}
