document.addEventListener("DOMContentLoaded", () => {

    // 1. URL Query Parameters Reading Logic
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('guest');
    const eventType = urlParams.get('event'); // 'wedding' or 'homecoming'

    // Guest Name Logic
    const guestNameElement = document.getElementById('guestName');
    if (guestParam) {
        guestNameElement.innerText = "Dear " + decodeURIComponent(guestParam);
    } else {
        guestNameElement.innerText = "Dear Guest";
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

    // 2. Preloader & Auto Play Music
    const preloader = document.getElementById('preloader');
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    let isPlaying = false;

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);

        // Auto music play attempt
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.innerText = "🎵 Pause Music";
        }).catch(() => {
            isPlaying = false;
            musicBtn.innerText = "🎵 Play Music";
        });
    }, 1500);

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerText = "🎵 Play Music";
        } else {
            bgMusic.play();
            musicBtn.innerText = "🎵 Pause Music";
        }
        isPlaying = !isPlaying;
    });

    // 3. Image Slider Auto Shift
    let currentSlide = 0;
    const sliderWrapper = document.getElementById('sliderWrapper');
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % 4;
        sliderWrapper.style.transform = `translateX(-${currentSlide * 25}%)`;
    }, 3000);

    // 4. Countdown Timer
    const targetDate = new Date('August 26, 2026 10:13:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            document.getElementById('days').innerText = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
            document.getElementById('hours').innerText = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById('minutes').innerText = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById('seconds').innerText = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 5. Language Switcher (English / Sinhala)
    const langBtn = document.getElementById('langToggleBtn');
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'si' : 'en';
        langBtn.innerText = currentLang === 'en' ? '🌐 සිංහල' : '🌐 English';

        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = el.getAttribute(`data-${currentLang}`);
        });
    });

    // 6. RSVP Buttons Response
    const attendBtn = document.getElementById('attendBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    const rsvpMsg = document.getElementById('rsvpStatusMsg');

    attendBtn.addEventListener('click', () => {
        rsvpMsg.style.color = "#27ae60";
        rsvpMsg.innerText = currentLang === 'en' ? "Thank you! We look forward to seeing you." : "ස්තූතියි! ඔබගේ පැමිණීම අපි බලාපොරොත්තු වෙමු.";
    });

    rejectBtn.addEventListener('click', () => {
        rsvpMsg.style.color = "#c0392b";
        rsvpMsg.innerText = currentLang === 'en' ? "Thank you for letting us know." : "දැනුවත් කිරීම පිළිබඳව ස්තූතියි.";
    });

    // 7. PDF Download Button
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
        const element = document.getElementById('invitationContent');
        html2pdf().from(element).save('Wedding_Invitation_Chathurni_Ashen.pdf');
    });
});
