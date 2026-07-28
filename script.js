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
document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (bgMusic) {
        bgMusic.volume = 0.6; // Volume 60%

        // Audio Context initialization to bypass strict autoplay policy
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let audioCtx;

        const unlockAndPlay = () => {
            if (!audioCtx) {
                audioCtx = new AudioContext();
            }

            // Resume audio context if suspended
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            // Play the music
            bgMusic.play().then(() => {
                if (musicBtn) {
                    musicBtn.textContent = "🎵 Pause Music";
                }
                // Once played successfully, remove all Global listeners
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

        // Screen එකේ කොහේ touch/click/scroll කළත් play වීමට:
        window.addEventListener("touchstart", unlockAndPlay, { passive: true });
        window.addEventListener("touchend", unlockAndPlay, { passive: true });
        window.addEventListener("click", unlockAndPlay);
        window.addEventListener("scroll", unlockAndPlay, { passive: true });

        // Button Click Event (Play / Pause toggle)
        if (musicBtn) {
            musicBtn.addEventListener("click", (e) => {
                e.stopPropagation(); // Global tap handler එකත් එක්ක ගැටීම වැළැක්වීමට
                
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
});
document.addEventListener("DOMContentLoaded", () => {
    const petalsContainer = document.querySelector('.petals-container');

    if (petalsContainer) {
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            // පෙති වල ප්‍රමාණය නොසමාන ලෙස (10px - 22px)
            const size = Math.random() * 12 + 10; 
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.3}px`; // මල් පෙත්තක ස්වාභාවික හැඩය

            // තිරයේ ඕනෑම තැනකින් ආරම්භ වීමට (0% - 100% width)
            petal.style.left = `${Math.random() * 100}vw`;

            // වැටෙන වේගය (තත්පර 4 - 8 අතර dynamic ලෙස වෙනස් වේ)
            const duration = Math.random() * 4 + 4;
            petal.style.animationDuration = `${duration}s`;

            petalsContainer.appendChild(petal);

            // Animation එක අවසන් වූ පසු පෙත්ත ඉවත් කිරීම
            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
        }

        // මල් පෙති ගොඩක් වැටීමට කාල පරතරය තත්පර 0.15 (150ms) දක්වා අඩු කර ඇත
        setInterval(createPetal, 150);
    }
});
