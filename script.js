document.addEventListener("DOMContentLoaded", () => {
    // 1. URL Query Parameters Reading Logic
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    const eventType = urlParams.get('event'); // 'wedding' or 'homecoming'
    const side = urlParams.get('side'); // 'groom' or 'bride'

    // Guest Name Logic
    const guestGreetingElement = document.getElementById('guestGreeting');
    if (guestGreetingElement) {
        if (guestParam) {
            guestGreetingElement.innerText = "Dear " + decodeURIComponent(guestParam);
        } else {
            guestGreetingElement.innerText = "Dear Guest";
        }
    }

    // Event Type Display Logic
    const weddingCard = document.getElementById('weddingCard');
    const homecomingCard = document.getElementById('homecomingCard');
    const weddingVenue = document.getElementById('weddingVenueSection');
    const homecomingVenue = document.getElementById('homecomingVenueSection');
    const brideRsvp = document.getElementById('brideRsvp');
    const groomRsvp = document.getElementById('groomRsvp');

    if (eventType === 'wedding') {
        if (homecomingCard) homecomingCard.style.display = 'none';
        if (homecomingVenue) homecomingVenue.style.display = 'none';
        if (groomRsvp) groomRsvp.style.display = 'none';
    } else if (eventType === 'homecoming') {
        if (weddingCard) weddingCard.style.display = 'none';
        if (weddingVenue) weddingVenue.style.display = 'none';
        if (brideRsvp) brideRsvp.style.display = 'none';
    }

    // --- Dynamic Name Order (Groom vs Bride Side Swap Logic) ---
    const brideWrapper = document.getElementById("bride-wrapper");
    const groomWrapper = document.getElementById("groom-wrapper");
    const andSign = document.getElementById("and-sign");

    if (brideWrapper && groomWrapper && andSign && andSign.parentNode) {
        if (side === 'groom') {
            andSign.parentNode.insertBefore(groomWrapper, andSign);
            andSign.parentNode.insertBefore(brideWrapper, andSign.nextSibling);
        } else {
            andSign.parentNode.insertBefore(brideWrapper, andSign);
            andSign.parentNode.insertBefore(groomWrapper, andSign.nextSibling);
        }
    }

    // 2. Preloader Hide Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 800);
    }

    // 3. Hero Background Image Auto Slider Logic
    const heroSlides = document.querySelectorAll('.hero-slide, .bg-slide');
    let currentHeroSlide = 0;

    if (heroSlides.length > 0) {
        setInterval(() => {
            heroSlides[currentHeroSlide].classList.remove('active');
            currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
            heroSlides[currentHeroSlide].classList.add('active');
        }, 3500);
    }

    // 4. Countdown Timer Logic
    const targetDate = new Date('August 26, 2026 10:13:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});

// Petals Falling Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const petalsContainer = document.querySelector('.petals-container');

    if (petalsContainer) {
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            const size = Math.random() * 12 + 10; 
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 1.3}px`;

            petal.style.left = `${Math.random() * 100}vw`;

            const duration = Math.random() * 6 + 8;
            petal.style.animationDuration = `${duration}s`;

            petalsContainer.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, duration * 1000);
        }

        setInterval(createPetal, 250);
    }
});

// Background Music Control Logic
document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (bgMusic) {
        bgMusic.volume = 0.5;

        const startAudioOnInteraction = () => {
            bgMusic.play().then(() => {
                if (musicBtn) musicBtn.textContent = "🎵 Pause Music";
            }).catch(error => {
                console.log("Autoplay blocked, waiting for click:", error);
            });

            document.removeEventListener("click", startAudioOnInteraction);
            document.removeEventListener("touchstart", startAudioOnInteraction);
        };

        document.addEventListener("click", startAudioOnInteraction);
        document.addEventListener("touchstart", startAudioOnInteraction);

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
});
