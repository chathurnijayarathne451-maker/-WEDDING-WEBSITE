// ===================================
// 1. URL Parameters & Dynamic Logic
// ===================================
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Guest";
const type = params.get("type") || "single";
const event = params.get("event") || "wedding";
const side = params.get("side") || "bride"; 
const guestId = params.get("id");

// Tracking Link Open Status
if (guestId) {
    let trackingData = JSON.parse(localStorage.getItem("invitation_tracking")) || {};
    trackingData[guestId] = "Opened";
    localStorage.setItem("invitation_tracking", JSON.stringify(trackingData));
}

// Personalization Control
const guestName = document.getElementById("guestName");
if (guestName) {
    if (type === "family") guestName.innerText = `Dear ${guest} & Family`;
    else if (type === "couple") guestName.innerText = `Dear ${guest} & Partner`;
    else guestName.innerText = `Dear ${guest}`;
}

// Side Switch Order Management (Bride / Groom Side)
const topName = document.getElementById("topName");
const bottomName = document.getElementById("bottomName");
const mainMonogram = document.getElementById("mainMonogram");
const loaderMonogram = document.getElementById("loaderMonogram");
const footerMonogram = document.getElementById("footerMonogram");

if (side === "groom") {
    if (topName) topName.innerText = "Ashen Anuradha";
    if (bottomName) bottomName.innerText = "Chathurni Sanchala";
} else {
    if (topName) topName.innerText = "Chathurni Sanchala";
    if (bottomName) bottomName.innerText = "Ashen Anuradha";
}

// Monogram ස්ථාවරව A ❤️ S ලෙස තැබීම
if (mainMonogram) mainMonogram.innerText = "A ❤️ S";
if (loaderMonogram) loaderMonogram.innerText = "A ❤️ S";
if (footerMonogram) footerMonogram.innerText = "A ❤️ S";

// ===================================
// 2. Event Switch & Dynamic RSVP (Updated Version)
// ===================================
const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const eventVenue = document.getElementById("eventVenue");
const weddingVenueCard = document.getElementById("weddingVenueCard");
const homecomingVenueCard = document.getElementById("homecomingVenueCard");
const optionalRSVP = document.getElementById("optionalRSVP");

let targetDate;
let rsvpNumbersHTML = "";

// බ්‍රයිඩ්ගේ පැත්තේ වෙඩින් නම්බර්ස්
const weddingNumbers = `
    <hr style="border: 0; border-top: 1px dashed #d4af37; margin: 15px 0;">
    <h4 style="font-family:'Cinzel',serif; color:#d4af37; margin-bottom: 8px;">Bride's Side Contact</h4>
    <p>Mr. Wasantha: <a href="tel:0713380734">0713380734</a></p>
    <p>Mrs. Dhammika: <a href="tel:0753380738">0753380738</a></p>
`;

// ගෲම්ගේ පැත්තේ හෝම්කමිං නම්බර්ස්
const homecomingNumbers = `
    <hr style="border: 0; border-top: 1px dashed #0b2c6b; margin: 15px 0;">
    <h4 style="font-family:'Cinzel',serif; color:#0b2c6b; margin-bottom: 8px;">Groom's Side Contact</h4>
    <p>Mr. Santha: <a href="tel:0717648030">0717648030</a></p>
    <p>Mrs. Renuka: <a href="tel:0702567153">0702567153</a></p>
`;

if (event === "homecoming") {
    eventTitle.innerHTML = "🏡 Homecoming Ceremony";
    eventDate.innerHTML = "30 August 2026";
    eventTime.innerHTML = "Reception Celebration";
    eventVenue.innerHTML = "Homecoming Venue";
    targetDate = new Date("August 30, 2026 18:00:00");

    if (weddingVenueCard) weddingVenueCard.style.display = "none";
    if (homecomingVenueCard) homecomingVenueCard.style.display = "block";
    rsvpNumbersHTML = homecomingNumbers; 

} else if (event === "both") {
    eventTitle.innerHTML = "💍 Wedding & Homecoming";
    eventDate.innerHTML = "Wedding - 26 August 2026<br><br>Homecoming - 30 August 2026";
    eventTime.innerHTML = "You are warmly invited to both celebrations";
    eventVenue.innerHTML = "Wedding & Homecoming Venues";
    targetDate = new Date("August 26, 2026 09:12:00");

    if (weddingVenueCard) weddingVenueCard.style.display = "block";
    if (homecomingVenueCard) homecomingVenueCard.style.display = "block";
    rsvpNumbersHTML = weddingNumbers + homecomingNumbers; 

} else {
    eventTitle.innerHTML = "💍 Wedding Ceremony";
    eventDate.innerHTML = "26 August 2026";
    eventTime.innerHTML = "Poruwa Ceremony - 09:12 AM";
    eventVenue.innerHTML = "Sevonlak Hotel, Maradagahamula";
    targetDate = new Date("August 26, 2026 09:12:00");

    if (weddingVenueCard) weddingVenueCard.style.display = "block";
    if (homecomingVenueCard) homecomingVenueCard.style.display = "none";
    rsvpNumbersHTML = weddingNumbers; 
}

if (optionalRSVP) optionalRSVP.innerHTML = rsvpNumbersHTML;

// ===================================
// 3. Countdown Process
// ===================================
function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference < 0) return;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) d.innerText = days < 10 ? "0" + days : days;
    if (h) h.innerText = hours < 10 ? "0" + hours : hours;
    if (m) m.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (s) s.innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ===================================
// 4. Music Play/Pause System
// ===================================
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
if (musicBtn && music) {
    musicBtn.addEventListener("click", () => {
        if (music.paused) { music.play(); musicBtn.innerText = "⏸ Pause Music"; }
        else { music.pause(); musicBtn.innerText = "🎵 Play Music"; }
    });
}

// ===================================
// 5. RSVP Action Handling
// ===================================
function updateRSVPStatus(status) {
    if (guestId) {
        let rsvpStatusData = JSON.parse(localStorage.getItem("invitation_rsvp")) || {};
        rsvpStatusData[guestId] = status;
        localStorage.setItem("invitation_rsvp", JSON.stringify(rsvpStatusData));
    }
    window.open(`https://wa.me/94713372644?text=Hello,%20I%20am%20${encodeURIComponent(guest)}.%20I%20will%20${status === 'Attending' ? 'attend' : 'not%20be%20able%20to%20attend'}%20your%20celebration.`, "_blank");
}

document.getElementById("attendBtn")?.addEventListener("click", () => updateRSVPStatus("Attending"));
document.getElementById("rejectBtn")?.addEventListener("click", () => updateRSVPStatus("Not Attending"));

// WhatsApp Share Integration
document.getElementById("shareBtn")?.addEventListener("click", () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent("You're invited to our Wedding ❤️ " + window.location.href)}`, "_blank");
});

// ===================================
// 6. Download PDF Logic
// ===================================
document.getElementById("downloadPdfBtn")?.addEventListener("click", () => {
    const element = document.getElementById("invitationContent");
    const opt = {
        margin: 10,
        filename: `${guest}_Wedding_Invitation.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// Petals Generator
const petalsContainer = document.querySelector(".petals-container");
if (petalsContainer) {
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal"); petal.innerHTML = "🌸";
        petal.style.left = Math.random() * 100 + "%";
        petal.style.animationDuration = (5 + Math.random() * 10) + "s";
        petal.style.fontSize = (15 + Math.random() * 20) + "px";
        petalsContainer.appendChild(petal);
    }
}

// Loader Screen Timeout Closer
window.addEventListener("load", () => {
    setTimeout(() => { document.getElementById("preloader")?.classList.add("hide-preloader"); }, 1200);
});