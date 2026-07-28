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
// DYNAMIC INVITATION & RSVP LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side');           // 'groom' or 'bride'
    const eventType = urlParams.get('event');      // 'wedding', 'homecoming', or 'both'
    const guestNameParam = urlParams.get('guest'); // Guest Name (e.g., "Mr. Jayarathne & Family")

    // DOM Element References
    // (HTML එකේ ඇති id="guest-greeting" සහ id="personalizedGuestName" දෙකටම support කරයි)
    const guestGreeting = document.getElementById("guest-greeting") || document.getElementById("personalizedGuestName");
    
    const weddingBlock = document.getElementById("weddingDetailsBlock");
    const homecomingBlock = document.getElementById("homecomingDetailsBlock");
    
    const groomContacts = document.getElementById("groomContacts");
    const brideContacts = document.getElementById("brideContacts");

    // Couple & Parents Order Containers
    const container = document.getElementById("couple-details-container");
    const brideWrapper = document.getElementById("bride-wrapper");
    const groomWrapper = document.getElementById("groom-wrapper");
    const andSign = document.getElementById("and-sign");

    // ------------------------------------------
    // 2. Personalized Guest Greeting
    // ------------------------------------------
    if (guestGreeting) {
        if (guestNameParam) {
            guestGreeting.textContent = `Dear ${decodeURIComponent(guestNameParam)}`;
        } else {
            guestGreeting.textContent = "Dear Guest";
        }
    }

    // ------------------------------------------
    // 3. Parents Order Swap Logic (Groom Side vs Bride Side)
    // ------------------------------------------
    if (side === 'groom' && container && brideWrapper && groomWrapper && andSign) {
        // Groom Side -> Groom Details උඩටත්, Bride Details යටටත් මාරු කරයි
        container.insertBefore(groomWrapper, andSign);
        container.appendChild(andSign);
        container.appendChild(brideWrapper);
    } else if (side === 'bride' && container && brideWrapper && groomWrapper && andSign) {
        // Bride Side -> Bride Details උඩටත්, Groom Details යටටත් මාරu කරයි
        container.insertBefore(brideWrapper, andSign);
        container.appendChild(andSign);
        container.appendChild(groomWrapper);
    }

    // ------------------------------------------
    // 4. Dynamic Event Display (Hide / Show Wedding vs Homecoming)
    // ------------------------------------------
    if (eventType === 'wedding') {
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "none";
    } else if (eventType === 'homecoming') {
        if (weddingBlock) weddingBlock.style.display = "none";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    } else {
        // Show Both Events (Default / Both)
        if (weddingBlock) weddingBlock.style.display = "block";
        if (homecomingBlock) homecomingBlock.style.display = "block";
    }

    // ------------------------------------------
    // 5. Dynamic RSVP Contacts Display (Groom vs Bride)
    // ------------------------------------------
    if (side === 'bride') {
        if (brideContacts) brideContacts.style.display = "block";
        if (groomContacts) groomContacts.style.display = "none";
    } else {
        // Default to Groom Side
        if (groomContacts) groomContacts.style.display = "block";
        if (brideContacts) brideContacts.style.display = "none";
    }

    // ------------------------------------------
    // 6. RSVP Form Submission via WhatsApp
    // ------------------------------------------
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
            const attendance = attendanceRadio ? attendanceRadio.value : 'Attending';
            const guestCount = document.getElementById("guestCount") ? document.getElementById("guestCount").value : '1';
            const currentGuestName = guestNameParam ? decodeURIComponent(guestNameParam) : "Valued Guest";

            // Target WhatsApp Number based on side
            // Bride -> 0713372644 (94713372644) | Groom -> 0752540988 (94752540988)
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
// Dynamic Multi-Box Countdown Function
function setupCountdown(weddingDateStr, homecomingDateStr) {
    const weddingTarget = new Date(weddingDateStr).getTime();
    const homecomingTarget = new Date(homecomingDateStr).getTime();

    function update() {
        const now = new Date().getTime();

        // 1. Wedding Countdown Calculation
        const weddingDiff = weddingTarget - now;
        if (weddingDiff > 0) {
            document.getElementById("days-wedding").innerText = String(Math.floor(weddingDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById("hours-wedding").innerText = String(Math.floor((weddingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("minutes-wedding").innerText = String(Math.floor((weddingDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("seconds-wedding").innerText = String(Math.floor((weddingDiff % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            document.getElementById("days-wedding").innerText = "00";
            document.getElementById("hours-wedding").innerText = "00";
            document.getElementById("minutes-wedding").innerText = "00";
            document.getElementById("seconds-wedding").innerText = "00";
        }

        // 2. Homecoming Countdown Calculation
        const homecomingDiff = homecomingTarget - now;
        if (homecomingDiff > 0) {
            document.getElementById("days-homecoming").innerText = String(Math.floor(homecomingDiff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById("hours-homecoming").innerText = String(Math.floor((homecomingDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("minutes-homecoming").innerText = String(Math.floor((homecomingDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("seconds-homecoming").innerText = String(Math.floor((homecomingDiff % (1000 * 60)) / 1000)).padStart(2, '0');
        } else {
            document.getElementById("days-homecoming").innerText = "00";
            document.getElementById("hours-homecoming").innerText = "00";
            document.getElementById("minutes-homecoming").innerText = "00";
            document.getElementById("seconds-homecoming").innerText = "00";
        }
    }

    update(); // Run immediately
    setInterval(update, 1000); // Update every second
}

// Start Countdown when page loads
document.addEventListener("DOMContentLoaded", () => {
    // කරුණාකර ඔබේ නිවැරදි Wedding & Homecoming දිනය සහ වේලාව යොදන්න (YYYY-MM-DDTHH:MM:SS)
    setupCountdown("2026-08-26T00:00:00", "2026-08-30T00:00:00");
});
document.addEventListener("DOMContentLoaded", () => {
    
    // URL එකෙන් parameters ලබා ගැනීම
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameParam = urlParams.get('guest'); // Admin Panel එකෙන් එන Salutation + Guest Name

    // HTML එකේ id="guest-greeting" ඇති element එක target කිරීම
    const guestGreeting = document.getElementById("guest-greeting");

    if (guestGreeting) {
        if (guestNameParam) {
            // URL එකෙහි guest parameter එක තිබේ නම් 'Dear [Name]' ලෙස පෙන්වයි
            guestGreeting.textContent = `Dear ${decodeURIComponent(guestNameParam)}`;
        } else {
            // URL එකෙහි නමක් නැත්නම් Default ලෙස පෙන්වයි
            guestGreeting.textContent = "Dear Guest";
        }
    }

});
document.addEventListener("DOMContentLoaded", () => {

    // 1. URL එකෙන් Parameters ලබා ගැනීම
    const urlParams = new URLSearchParams(window.location.search);
    const side = urlParams.get('side'); // 'groom' හෝ 'bride' කියන අගය ලැබේ

    // 2. Elements Target කිරීම
    const container = document.getElementById("couple-details-container");
    const brideWrapper = document.getElementById("bride-wrapper");
    const groomWrapper = document.getElementById("groom-wrapper");
    const andSign = document.getElementById("and-sign");

    // 3. Side එක Groom නම්: Groom උඩට සහ Bride යටට මාරු කිරීම
    if (side === 'groom' && container && brideWrapper && groomWrapper && andSign) {
        
        // පැහැදිලි පිළිවෙල: Groom -> & -> Bride
        container.insertBefore(groomWrapper, andSign); // Groom එක & එකට උඩින් තබයි
        container.appendChild(andSign);                // & එක මැදට
        container.appendChild(brideWrapper);            // Bride එක යටටම
        
    } 
    // 4. Side එක Bride නම් (හෝ Default): Bride උඩට සහ Groom යටට මාරු කිරීම
    else if (side === 'bride' && container && brideWrapper && groomWrapper && andSign) {
        
        // පැහැදිලි පිළිවෙල: Bride -> & -> Groom
        container.insertBefore(brideWrapper, andSign); // Bride එක & එකට උඩින් තබයි
        container.appendChild(andSign);                // & එක මැදට
        container.appendChild(groomWrapper);            // Groom එක යටටම
        
    }

});
document.addEventListener("DOMContentLoaded", () => {

    // 1. URL එකෙන් event parameter එක ලබා ගැනීම
    const urlParams = new URLSearchParams(window.location.search);
    const eventType = urlParams.get('event'); // 'wedding', 'homecoming', or 'both'

    // 2. ඔබගේ HTML එකේ ඇති Countdown Cards & Event Sections සොයා ගැනීම
    // (මේවායේ .countdown-card, .wedding-card, #wedding-section වැනි ඕනෑම Class/ID එකක් තිබුණත් target වේ)
    const weddingElements = document.querySelectorAll('.wedding-card, #weddingDetailsBlock, .wedding-section, #wedding-section');
    const homecomingElements = document.querySelectorAll('.homecoming-card, #homecomingDetailsBlock, .homecoming-section, #homecoming-section');

    // 3. Event Selection Filter Rules
    if (eventType === 'wedding') {
        
        // 💍 Wedding Day Only -> Wedding පෙන්වයි, Homecoming Hide කරයි
        weddingElements.forEach(el => el.style.display = 'block');
        homecomingElements.forEach(el => el.style.display = 'none');

        // Card එක ඇතුළේ ඇති Homecoming Card එක විතරක් Hide කිරීම:
        document.querySelectorAll('.countdown-card').forEach(card => {
            if (card.innerText.includes('Homecoming') || card.innerText.includes('දෙවෙනි ගමන')) {
                card.style.display = 'none';
            }
            if (card.innerText.includes('Wedding') || card.innerText.includes('මංගල')) {
                card.style.display = 'block';
            }
        });
        
    } else if (eventType === 'homecoming') {
        
        // 🥂 Homecoming Day Only -> Homecoming පෙන්වයි, Wedding Hide කරයි
        weddingElements.forEach(el => el.style.display = 'none');
        homecomingElements.forEach(el => el.style.display = 'block');

        // Card එක ඇතුළේ ඇති Wedding Card එක විතරක් Hide කිරීම:
        document.querySelectorAll('.countdown-card').forEach(card => {
            if (card.innerText.includes('Wedding') || card.innerText.includes('මංගල')) {
                card.style.display = 'none';
            }
            if (card.innerText.includes('Homecoming') || card.innerText.includes('දෙවෙනි ගමන')) {
                card.style.display = 'block';
            }
        });
        
    } else {
        
        // 🎉 Both Events -> සියලුම Details & Cards පෙන්වයි
        weddingElements.forEach(el => el.style.display = 'block');
        homecomingElements.forEach(el => el.style.display = 'block');
        document.querySelectorAll('.countdown-card').forEach(card => card.style.display = 'block');
        
    }
});
