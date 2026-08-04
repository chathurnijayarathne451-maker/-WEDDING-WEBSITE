document.addEventListener("DOMContentLoaded", () => {
    // 1. URL Query Parameters Reading Logic
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    const eventType = urlParams.get('event'); // 'wedding' or 'homecoming'
    const side = urlParams.get('side'); // 'groom' or 'bride'
    
    // Dynamic RSVP Contact Numbers Update
    const rsvpContactsDiv = document.getElementById('rsvpContacts') || document.querySelector('.rsvp-contacts');

    if (rsvpContactsDiv) {
        if (side === 'bride') {
            rsvpContactsDiv.innerHTML = `
                <p>📞 Bride (Sanchala): 0713372644</p>
                <p>📞 Bride's Mother (Mrs. Dhammika): 0753380738</p>
            `;
        } else {
            rsvpContactsDiv.innerHTML = `
                <p>📞 Groom (Ashen): 0752540988</p>
                <p>📞 Groom's Father (Mr. Santha): 0717648030</p>
            `;
        }
    }

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
    const brideRsvp = document.getElementById('brideRsvp');
    const groomRsvp = document.getElementById('groomRsvp');

    // Date Banners (August 26 / August 30 Cards)
    const weddingDateCard = document.getElementById('weddingDateCard');
    const homecomingDateCard = document.getElementById('homecomingDateCard');

    // Event & Venue Cards
    const weddingSections = document.querySelectorAll('#weddingVenueSection');
    const homecomingSections = document.querySelectorAll('#homecomingVenueSection');

    if (eventType === 'wedding') {
        if (homecomingCard) homecomingCard.style.display = 'none';
        if (groomRsvp) groomRsvp.style.display = 'none';
        if (homecomingDateCard) homecomingDateCard.style.display = 'none';
        homecomingSections.forEach(el => el.style.display = 'none');
    } else if (eventType === 'homecoming') {
        if (weddingCard) weddingCard.style.display = 'none';
        if (brideRsvp) brideRsvp.style.display = 'none';
        if (weddingDateCard) weddingDateCard.style.display = 'none';
        weddingSections.forEach(el => el.style.display = 'none');
    }

    // Dynamic Name Order (Groom vs Bride Side Swap Logic)
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
        preloader.classList.add('hide');
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

    // 4. Countdown Timer Logic (Wedding & Homecoming)
    const weddingTarget = new Date('August 26, 2026 10:13:00').getTime();
    const homecomingTarget = new Date('August 30, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();

        // Wedding Countdown
        const diffWedding = weddingTarget - now;
        if (diffWedding > 0) {
            const days = Math.floor(diffWedding / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffWedding % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffWedding % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffWedding % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days-wedding');
            const hoursEl = document.getElementById('hours-wedding');
            const minsEl = document.getElementById('minutes-wedding');
            const secsEl = document.getElementById('seconds-wedding');

            if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
            if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secsEl) secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        // Homecoming Countdown
        const diffHomecoming = homecomingTarget - now;
        if (diffHomecoming > 0) {
            const days = Math.floor(diffHomecoming / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffHomecoming % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffHomecoming % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffHomecoming % (1000 * 60)) / 1000);

            const daysElHC = document.getElementById('days-homecoming');
            const hoursElHC = document.getElementById('hours-homecoming');
            const minsElHC = document.getElementById('minutes-homecoming');
            const secsElHC = document.getElementById('seconds-homecoming');

            if (daysElHC) daysElHC.innerText = days < 10 ? '0' + days : days;
            if (hoursElHC) hoursElHC.innerText = hours < 10 ? '0' + hours : hours;
            if (minsElHC) minsElHC.innerText = minutes < 10 ? '0' + minutes : minutes;
            if (secsElHC) secsElHC.innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
// 5. Music Play/Pause Toggle Logic
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerText = '🎵';
                isPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerText = '⏸️';
                    isPlaying = true;
                }).catch(err => {
                    console.log("Music playback error:", err);
                });
            }
        });

        // User Screen එක Click / Touch කළ සැනින් Auto Play ආරම්භ කිරීම
        document.body.addEventListener('click', () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    musicBtn.innerText = '⏸️';
                    isPlaying = true;
                }).catch(() => {});
            }
        }, { once: true });
    }
    // 5. Petals Falling Animation Logic
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
