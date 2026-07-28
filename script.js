// Preloader Hide Function
function hidePreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => { preloader.style.display = "none"; }, 500);
    }
}
window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 3000);

// Countdown Function
function setupCountdown(weddingDateStr, homecomingDateStr) {
    const weddingTarget = new Date(weddingDateStr).getTime();
    const homecomingTarget = new Date(homecomingDateStr).getTime();

    function update() {
        const now = new Date().getTime();

        // Wedding Countdown
        const wDiff = weddingTarget - now;
        if (wDiff > 0) {
            if(document.getElementById("days-wedding")) document.getElementById("days-wedding").innerText = String(Math.floor(wDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            if(document.getElementById("hours-wedding")) document.getElementById("hours-wedding").innerText = String(Math.floor((wDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            if(document.getElementById("minutes-wedding")) document.getElementById("minutes-wedding").innerText = String(Math.floor((wDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            if(document.getElementById("seconds-wedding")) document.getElementById("seconds-wedding").innerText = String(Math.floor((wDiff % (1000 * 60)) / 1000)).padStart(2, '0');
        }

        // Homecoming Countdown
        const hDiff = homecomingTarget - now;
        if (hDiff > 0) {
            if(document.getElementById("days-homecoming")) document.getElementById("days-homecoming").innerText = String(Math.floor(hDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            if(document.getElementById("hours-homecoming")) document.getElementById("hours-homecoming").innerText = String(Math.floor((hDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            if(document.getElementById("minutes-homecoming")) document.getElementById("minutes-homecoming").innerText = String(Math.floor((hDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            if(document.getElementById("seconds-homecoming")) document.getElementById("seconds-homecoming").innerText = String(Math.floor((hDiff % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    }
    update();
    setInterval(update, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side');           // 'groom' or 'bride'
    const eventType = urlParams.get('event');      // 'wedding', 'homecoming', or 'both'
    const guestNameParam = urlParams.get('guest');

    // Guest Greeting
    const guestGreeting = document.getElementById("guest-greeting");
    if (guestGreeting) {
        guestGreeting.textContent = guestNameParam ? `Dear ${decodeURIComponent(guestNameParam)}` : "Dear Guest";
    }

    // Dynamic Name Order (Groom vs Bride Side)
    const container = document.getElementById("couple-details-container");
    const brideWrapper = document.getElementById("bride-wrapper");
    const groomWrapper = document.getElementById("groom-wrapper");
    const andSign = document.getElementById("and-sign");

    if (container && brideWrapper && groomWrapper && andSign) {
        if (side === 'groom') {
            container.insertBefore(groomWrapper, andSign);
            container.appendChild(andSign);
            container.appendChild(brideWrapper);
        } else if (side === 'bride') {
            container.insertBefore(brideWrapper, andSign);
            container.appendChild(andSign);
            container.appendChild(groomWrapper);
        }
    }

    // 🎯 DYNAMIC EVENT FILTERING LOGIC
    const weddingElements = document.querySelectorAll('.wedding-only');
    const homecomingElements = document.querySelectorAll('.homecoming-only');

    if (eventType === 'wedding') {
        // 💍 WEDDING ONLY: Homecoming details Hide කරයි
        weddingElements.forEach(el => el.style.display = 'block');
        homecomingElements.forEach(el => el.style.display = 'none');
    } else if (eventType === 'homecoming') {
        // 🥂 HOMECOMING ONLY: Wedding details Hide කරයි
        weddingElements.forEach(el => el.style.display = 'none');
        homecomingElements.forEach(el => el.style.display = 'block');
    } else {
        // 🎉 BOTH EVENTS: දෙකම පෙන්වයි
        weddingElements.forEach(el => el.style.display = 'block');
        homecomingElements.forEach(el => el.style.display = 'block');
    }

    // Contact Details Display
    const groomContacts = document.getElementById("groomContacts");
    const brideContacts = document.getElementById("brideContacts");
    if (side === 'bride') {
        if (brideContacts) brideContacts.style.display = "block";
        if (groomContacts) groomContacts.style.display = "none";
    } else {
        if (groomContacts) groomContacts.style.display = "block";
        if (brideContacts) brideContacts.style.display = "none";
    }

    // RSVP Form Toggle
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const guestCountBox = document.getElementById("guestCountBox");
    attendanceRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (guestCountBox) {
                guestCountBox.style.display = e.target.value === 'Attending' ? 'block' : 'none';
            }
        });
    });

    // RSVP Form WhatsApp Submit
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Attending';
            const guestCount = document.getElementById("guestCount")?.value || '1';
            const currentGuestName = guestNameParam ? decodeURIComponent(guestNameParam) : "Valued Guest";
            const targetPhone = (side === 'bride') ? "94713372644" : "94752540988";

            let message = `Hello! RSVP Confirmation from *${currentGuestName}*:\n\n`;
            if (attendance === 'Attending') {
                message += `Status: ✅ We Will Attend\n`;
                message += `Number of Guests: ${guestCount}\n\nLooking forward to celebrating with you! ✨`;
            } else {
                message += `Status: ❌ Sorry, Cannot Attend\n\nSending our warmest wishes! 🌹`;
            }

            window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`, "_blank");
        });
    }

    // Background Music
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");
    if (bgMusic && musicBtn) {
        bgMusic.volume = 0.6;
        musicBtn.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicBtn.textContent = "🎵 Pause Music";
            } else {
                bgMusic.pause();
                musicBtn.textContent = "🎵 Play Music";
            }
        });
    }

    // Countdown Setup
    setupCountdown("2026-08-26T00:00:00", "2026-08-30T00:00:00");
});
