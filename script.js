document.addEventListener("DOMContentLoaded", function () {
    console.log("Wedding Website Loaded!");

    // --- 1. Preloader ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 1000);
    }

    // --- 2. URL Parameters Handling (Personalization & Tracking) ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('id');
    const guestName = urlParams.get('guest');
    const targetEvent = urlParams.get('event');

    if (guestName) {
        document.getElementById("guestName").innerText = `Dear ${decodeURIComponent(guestName)}`;
    }

    if (guestId) {
        let tracking = JSON.parse(localStorage.getItem("invitation_tracking")) || {};
        tracking[guestId] = true;
        localStorage.setItem("invitation_tracking", JSON.stringify(tracking));
    }

    // Dynamic Venue visibility based on Event
    const weddingCard = document.getElementById("weddingVenueCard");
    const homecomingCard = document.getElementById("homecomingVenueCard");

    if (targetEvent === "wedding") {
        if (homecomingCard) homecomingCard.style.display = "none";
    } else if (targetEvent === "homecoming") {
        if (weddingCard) weddingCard.style.display = "none";
        document.getElementById("eventTitle").innerText = "Homecoming Ceremony";
        document.getElementById("eventDate").innerText = "30 August 2026";
        document.getElementById("eventTime").innerText = "Reception – 11:30 AM Onwards";
        document.getElementById("eventVenue").innerText = "Samara Banquet Hall";
    }

    // --- 3. Music Player ---
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    if (music && musicBtn) {
        musicBtn.addEventListener("click", function () {
            if (music.paused) {
                music.play();
                musicBtn.innerHTML = "🎵 Pause Music";
            } else {
                music.pause();
                musicBtn.innerHTML = "🎵 Music";
            }
        });
    }

    // --- 4. Countdown Timer (Target: August 26, 2026) ---
    const weddingDate = new Date("August 26, 2026 09:12:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 5. RSVP Buttons Handler ---
    const attendBtn = document.getElementById("attendBtn");
    const rejectBtn = document.getElementById("rejectBtn");
    const rsvpStatusMsg = document.getElementById("rsvpStatusMsg");

    function setRSVPStatus(status) {
        if (guestId) {
            let rsvp = JSON.parse(localStorage.getItem("invitation_rsvp")) || {};
            rsvp[guestId] = status;
            localStorage.setItem("invitation_rsvp", JSON.stringify(rsvp));
        }
        if (rsvpStatusMsg) {
            rsvpStatusMsg.innerText = status === "Attending" 
                ? "🎉 Thank you! Your response (Attending) has been recorded." 
                : " We appreciate your response (Cannot Attend).";
            rsvpStatusMsg.style.color = status === "Attending" ? "#27ae60" : "#c0392b";
        }
    }

    if (attendBtn) attendBtn.addEventListener("click", () => setRSVPStatus("Attending"));
    if (rejectBtn) rejectBtn.addEventListener("click", () => setRSVPStatus("Declined"));

    // --- 6. PDF Download & Share ---
    const pdfBtn = document.getElementById("downloadPdfBtn");
    if (pdfBtn) {
        pdfBtn.addEventListener("click", function () {
            const element = document.getElementById("invitationContent");
            const opt = {
                margin:       0.5,
                filename:     'Wedding_Invitation_Chathurni_Ashen.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save();
        });
    }

    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) {
        shareBtn.addEventListener("click", function () {
            const text = encodeURIComponent("You are cordially invited to celebrate our wedding! Click the link to view the invitation: " + window.location.href);
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        });
    }

    // --- 7. Floating Petals Effect Canvas ---
    const canvas = document.createElement('canvas');
    document.querySelector('.petals-container').appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const flowerCount = 25;
    const flowers = [];

    class DarkerFlower {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.r = Math.random() * 5 + 4;
            this.vs = Math.random() * 0.7 + 0.3;
            this.ys = Math.random() * 1;
            this.angle = Math.random() * 360;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);

            ctx.fillStyle = 'rgba(230, 100, 140, 0.65)';
            for (let i = 0; i < 5; i++) {
                ctx.rotate(72 * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, this.r, this.r / 1.4, this.r, 0, 0, 2 * Math.PI);
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(0, 0, this.r / 2.8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(212, 160, 23, 0.85)';
            ctx.fill();

            ctx.restore();
        }

        update() {
            this.y += this.vs;
            this.x += Math.sin(this.ys) * 0.4;
            this.ys += 0.008;
            this.angle += 0.4;

            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }
    }

    for (let i = 0; i < flowerCount; i++) {
        flowers.push(new DarkerFlower());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        flowers.forEach(flower => {
            flower.draw();
            flower.update();
        });
        requestAnimationFrame(animate);
    }

    animate();
});
