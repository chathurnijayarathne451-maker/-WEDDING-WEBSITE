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
// HELPER FUNCTIONS
// ==========================================

// Helper function to hide elements by text keywords safely
function hideElementsByText(keywords) {
    const allCards = document.querySelectorAll('.event-card, .countdown-card, .location-card, .ceremony-card, .details-card, section');
    
    allCards.forEach(card => {
        const cardText = card.innerText ? card.innerText.toLowerCase() : '';
        const hasKeyword = keywords.some(key => cardText.includes(key.toLowerCase()));
        
        // Protect essential elements from being hidden
        const isEssential = card.querySelector('.couple-name') || 
                            card.querySelector('.parents-names') || 
                            card.querySelector('.calendar-container') || 
                            card.id === 'couple-details-container';

        if (hasKeyword && !isEssential) {
            card.style.display = 'none';
        }
    });
}

// Toggle Guest Count Field Visibility for RSVP
function toggleGuestCount(willAttend) {
    const guestCountBox = document.getElementById('guestCountBox');
    if (guestCountBox) {
        guestCountBox.style.display = willAttend ? 'block' : 'none';
    }
}

// Dynamic Multi-Box Countdown Function
function setupCountdown(weddingDateStr, homecomingDateStr) {
    const weddingTarget = new Date(weddingDateStr).getTime();
    const homecomingTarget = new Date(homecomingDateStr).getTime();

    function update() {
        const now = new Date().getTime();

        // 1. Wedding Countdown Calculation
        const weddingDiff = weddingTarget - now;
        const daysW = document.getElementById("days-wedding");
        const hoursW = document.getElementById("hours-wedding");
        const minsW = document.getElementById("minutes-wedding");
        const secsW = document.getElementById("seconds-wedding");

        if (daysW && hoursW && minsW && secsW) {
            if (weddingDiff > 0) {
                daysW.innerText = String(Math.floor(weddingDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
                hoursW.innerText = String(Math.floor((weddingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                minsW.innerText = String(Math.floor((weddingDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                secsW.innerText = String(Math.floor((weddingDiff % (1000 * 60)) / 1000)).padStart(2, '0');
            } else {
                daysW.innerText = "00"; hoursW.innerText = "00"; minsW.innerText = "00"; secsW.innerText = "00";
            }
        }

        // 2. Homecoming Countdown Calculation
        const homecomingDiff = homecomingTarget - now;
        const daysH = document.getElementById("days-homecoming");
        const hoursH = document.getElementById("hours-homecoming");
        const minsH = document.getElementById("minutes-homecoming");
        const secsH = document.getElementById("seconds-homecoming");

        if (daysH && hoursH && minsH && secsH) {
            if (homecomingDiff > 0) {
                daysH.innerText = String(Math.floor(homecomingDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
                hoursH.innerText = String(Math.floor((homecomingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
                minsH.innerText = String(Math.floor((homecomingDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
                secsH.innerText = String(Math.floor((homecomingDiff % (1000 * 60)) / 1000)).padStart(2, '0');
            } else {
                daysH.innerText = "00"; hoursH.innerText = "00"; minsH.innerText = "00"; secsH.innerText = "00";
            }
        }
    }

    update(); // Run immediately
    setInterval(update, 1000); // Update every second
}


// ==========================================
// 2. MAIN APPLICATION INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- A. URL Parameters ---
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side');           // 'groom' or 'bride'
    const eventType = urlParams.get('event');      // 'wedding', 'homecoming', or 'both'
    const guestNameParam = urlParams.get('guest'); // Guest Name (e.g., "Mr. Jayarathne & Family")

    // --- B. Guest Greeting ---
    const guestGreeting = document.getElementById("guest-greeting") || document.getElementById("personalizedGuestName");
    if (guestGreeting) {
        if (guestNameParam) {
            guestGreeting.textContent = `Dear ${decodeURIComponent(guestNameParam)}`;
        } else {
            guestGreeting.textContent = "Dear Guest";
        }
    }

    // --- C. Parents Order Swap Logic (Groom vs Bride) ---
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

    // --- D. Dynamic Event Display (Wedding vs Homecoming Filter) ---
    const weddingBlock = document.getElementById("weddingDetailsBlock");
    const homecomingBlock = document.getElementById("homecomingDetailsBlock");
    const weddingElements = document.querySelectorAll('.wedding-card, .wedding-section, .wedding-venue, .wedding-ceremony, #wedding-section');
    const homecomingElements = document.querySelectorAll('.homecoming-card, .homecoming-section, .homecoming-venue, .homecoming-ceremony, #homecoming-section');

    if (eventType === 'wedding') {
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "none";

        weddingElements.forEach(el => el.style.display = "block");
        homecomingElements.forEach(el => el.style.display = "none");

        document.querySelectorAll('.countdown-card').forEach(card => {
            if (card.innerText.includes('Homecoming') || card.innerText.includes('දෙවෙනි ගමන')) {
                card.style.display = 'none';
            }
            if (card.innerText.includes('Wedding') || card.innerText.includes('මංගල')) {
                card.style.display = 'block';
            }
        });

        hideElementsByText(['homecoming', 'දෙවෙනි ගමන']);

    } else if (eventType === 'homecoming') {
        if (weddingBlock) weddingBlock.style.display = "none";
        if (homecomingBlock) homecomingBlock.style.display = "block";

        weddingElements.forEach(el => el.style.display = "none");
        homecomingElements.forEach(el => el.style.display = "block");

        document.querySelectorAll('.countdown-card').forEach(card => {
            if (card.innerText.includes('Wedding') || card.innerText.includes('මංගල')) {
                card.style.display = 'none';
            }
            if (card.innerText.includes('Homecoming') || card.innerText.includes('දෙවෙනි ගමන')) {
                card.style.display = 'block';
            }
        });

        hideElementsByText(['wedding', 'මංගල']);

    } else {
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "block";

        weddingElements.forEach(el => el.style.display = "block");
        homecomingElements.forEach(el => el.style.display = "block");
        document.querySelectorAll('.countdown-card').forEach(card => card.style.display = 'block');
    }

    // --- E. Dynamic RSVP Contacts Display ---
    const groomContacts = document.getElementById("groomContacts");
    const brideContacts = document.getElementById("brideContacts");

    if (side === 'bride') {
        if (brideContacts) brideContacts.style.display = "block";
        if (groomContacts) groomContacts.style.display = "none";
    } else {
        if (groomContacts) groomContacts.style.display = "block";
        if (brideContacts) brideContacts.style.display = "none";
    }

    // --- F. RSVP Form Submission via WhatsApp ---
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
            const attendance = attendanceRadio ? attendanceRadio.value : 'Attending';
            const guestCount = document.getElementById("guestCount") ? document.getElementById("guestCount").value : '1';
            const currentGuestName = guestNameParam ? decodeURIComponent(guestNameParam) : "Valued Guest";

            const targetPhone = (side === 'bride') ? "94713372644" : "94752540988";

            let message = `Hello! RSVP Confirmation from *${currentGuestName}*:\n\n`;
            if (attendance === 'Attending') {
                message += `Status: ✅ We Will Attend\n`;
                message += `Number of Guests: ${guestCount}\n\n`;
                message += `Looking forward to celebrating with you! ✨`;
            } else {
                message += `Status: ❌ Sorry, Cannot Attend\n\n`;
                message += `Sending our warmest wishes and blessings! 🌹`;
            }

            const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, "_blank");
        });
    }

    // --- G. Background Music Controller ---
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (bgMusic) {
        bgMusic.volume = 0.6;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx;

        const unlockAndPlay = () => {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            bgMusic.play().then(() => {
                if (musicBtn) {
                    musicBtn.textContent = "🎵 Pause Music";
                }
                removeAllListeners();
            }).catch(e => {
                console.log("Play failed, waiting for valid gesture:", e);
            });
        };

        const removeAllListeners = () => {
            window.removeEventListener("touchstart", unlockAndPlay);
            window.removeEventListener("touchend", unlockAndPlay);
            window.removeEventListener("click", unlockAndPlay);
            window.removeEventListener("scroll", unlockAndPlay);
        };

        window.addEventListener("touchstart", unlockAndPlay, { passive: true });
        window.addEventListener("touchend", unlockAndPlay, { passive: true });
        window.addEventListener("click", unlockAndPlay);
        window.addEventListener("scroll", unlockAndPlay, { passive: true });

        if (musicBtn) {
            musicBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (bgMusic.paused) {
                    bgMusic.play();
                    musicBtn.textContent = "🎵 Pause Music";
                } else {
                    bgMusic.pause();
                    musicBtn.textContent = "🎵 Play Music";
                }
            });
        }
    }

    // --- H. Petals Animation Generator ---
    const petalsContainer = document.querySelector('.petals-container');
    if (petalsContainer) {
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            const size = Math.random() * 12 + 10; 
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.3}px`;
            petal.style.left = `${Math.random() * 100}vw`;

            const duration = Math.random() * 4 + 4;
            petal.style.animationDuration = `${duration}s`;

            petalsContainer.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
        }

        setInterval(createPetal, 150);
    }

    // --- I. Countdown Setup Trigger ---
    setupCountdown("2026-08-26T00:00:00", "2026-08-30T00:00:00");

});
