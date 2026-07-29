@import url('https://fonts.googleapis.com/css2?family=Gwendolyn:wght@400;700&display=swap');
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
    font-family: 'Poppins', sans-serif;
    background: #fbf9f4;
    color: #333;
    overflow-x: hidden;
}
/* Petals Container */
.petals-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none; /* Site එක click කිරීමට බාධාවක් නොවීමට */
    z-index: 999;
    overflow: hidden;
}

/* Red / Soft Pink Rose Petal Design */
.petal {
    position: absolute;
    top: -30px;
    background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 50%, #e84393 100%);
    border-radius: 15px 0 15px 0;
    opacity: 0.85;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    animation: fallAndSway linear infinite;
}

/* Falling & Swinging Animation */
@keyframes fallAndSway {
    0% {
        opacity: 0;
        transform: translateY(0) rotate(0deg) translateX(0);
    }
    10% {
        opacity: 0.9;
    }
    50% {
        transform: translateY(50vh) rotate(180deg) translateX(80px);
    }
    75% {
        transform: translateY(75vh) rotate(270deg) translateX(-40px);
    }
    100% {
        opacity: 0;
        transform: translateY(105vh) rotate(360deg) translateX(100px);
    }
}
/* Preloader - START */
#preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    transition: opacity 0.8s ease, visibility 0.8s ease;
}

#preloader.hide {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}
/* Preloader - END */

.loader-monogram {
    font-family: 'Cinzel', serif;
    font-size: 45px;
    color: #d4af37;
    margin-bottom: 15px;
}

.loader-line {
    width: 150px; height: 1px;
    background: linear-gradient(to right, transparent, #d4af37, transparent);
    margin: 0 auto 15px auto;
}

.loader-text {
    color: #a69a80;
    font-size: 13px;
    letter-spacing: 2px;
}

/* Top Controls */
.top-controls {
    position: fixed;
    top: 15px; right: 15px;
    z-index: 1000;
    display: flex;
    gap: 10px;
}

.ctrl-btn {
    border: none;
    padding: 8px 15px;
    background: rgba(212, 175, 55, 0.9);
    color: white;
    border-radius: 50px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

/* Hero Section */
/* --- Hero Section - START --- */
.hero {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #faf8f5;
}

/* Background Photo Slider */
.hero-bg-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70vh;
    z-index: 1;
    overflow: hidden;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
}

.hero-slide.active {
    opacity: 1;
}

/* Photo එක මැදින් Ashen & Sanchala (තවත් උඩට ගෙන ඇත) */
.monogram-container {
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 100%;
    text-align: center;
}

.monogram {
    font-size: 62px;
    font-family: 'Alex Brush', 'Parisienne', cursive;
    color: #ffffff;
    font-weight: 400;
    letter-spacing: 1px;
    text-shadow: 0 3px 12px rgba(0, 0, 0, 0.85);
}
/* Photo Space Height */
.photo-spacer {
    height: 60vh;
    width: 100%;
    position: relative;
    z-index: 2;
}

/* Photo එකෙන් පහළ Wording - Box සහ Border ඉවත් කර ඇත */
.hero-content-below {
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 800px;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
}

/* "Dear Guest" Text Style */
.guest-name-text {
    font-size: 22px;
    color: #b8860b;
    font-family: 'Cinzel', 'Playfair Display', serif;
    font-weight: 600;
    margin-bottom: 8px;
}

/* "DAUGHTER OF" & "SON OF" */
.parents-title {
    font-size: 11px;
    letter-spacing: 3px;
    color: #888888;
    font-family: 'Cinzel', serif;
    font-weight: 600;
    margin-top: 5px;
}

/* දෙමාපියන්ගේ නම් (Classic Elegant Font) */
.parents-names {
    font-size: 20px;
    color: #2c2c2c;
    font-family: 'Cinzel', 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.4;
}

/* මනාලිය සහ මනාලයාගේ නම් (Classic Script / Serif Font) */
.couple-name {
    font-family: 'Great Vibes', 'Playfair Display', serif;
    font-size: 38px;
    color: #1a1a1a;
    font-weight: 500;
    margin: 2px 0;
}

/* '&' සලකුණ */
.and {
    font-size: 26px;
    color: #d4af37;
    font-family: 'Cinzel', serif;
    font-weight: bold;
}

/* "We Are Getting Married" */
.heading-getting-married {
    font-family: 'Cinzel', serif;
    letter-spacing: 2px;
    font-size: 20px;
    color: #8b6b23;
    margin-top: 15px;
}

.invitation-text {
    color: #666;
    font-size: 15px;
    font-family: 'Cinzel', serif;
}

/* Scroll Button */
.scroll-btn-container {
    margin-top: 15px;
}

.scroll-btn {
    display: inline-block;
    padding: 10px 25px;
    background: #d4af37;
    color: white;
    text-decoration: none;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Cinzel', serif;
    box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
}
/* --- Hero Section - END --- */

.countdown {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.time-box {
    width: 80px;
    background: white;
    border: 2px solid #d4af37;
    border-radius: 12px;
    padding: 10px;
}

.time-box span {
    font-size: 24px;
    font-weight: bold;
    color: #d4af37;
    display: block;
}

.time-box small { font-size: 10px; text-transform: uppercase; color: #666; }

/* Cards & Sections */

.event-card, .venue-card, .rsvp-card {
    max-width: 600px;
    margin: 0 auto 20px auto;
    background: white;
    padding: 25px;
    border-radius: 15px;
    border: 1px solid #f0d98a;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}

.event-date { font-size: 18px; color: #d4af37; font-weight: 600; margin-bottom: 10px; }

/* Calendar */

.calendar-header, .calendar-grid {
    
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    max-width: 400px;
    margin: 0 auto;
    gap: 5px;
}

.calendar-header div { font-weight: bold; color: #a69a80; font-size: 13px; }

.calendar-grid .day {
    height: 45px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 12px;
    border: 1px solid #eee;
}

.calendar-grid .empty { background: transparent; border: none; }
.calendar-grid .wedding { background: #d4af37; color: white; border: none; }
.calendar-grid .homecoming { background: #0b2c6b; color: white; border: none; }

/* Buttons & Map */

.btn {
    display: inline-block;
    padding: 10px 20px;
    background: #d4af37;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 5px;
    font-size: 13px;
}

.homecoming-btn { background: #0b2c6b; }
.secondary { background: #888; }
.map-container { border-radius: 10px; overflow: hidden; margin: 15px 0; }

.rsvp-group { margin-bottom: 15px; }

/* Footer */
footer { background: #111; color: white; padding: 30px 20px; }
footer h2 { color: #d4af37; font-family: 'Cinzel', serif; }
.developer-credit { font-size: 11px; margin-top: 15px; color: #a69a80; }

.custom-shape-divider-bottom {
    position: absolute; bottom: 0; left: 0; width: 100%; overflow: hidden; line-height: 0; transform: rotate(180deg);
}
.custom-shape-divider-bottom svg { width: calc(150% + 1.3px); height: 50px; }

.wedding-date-badge-section { padding-top: 40px; }
.date-badge-container { display: flex; align-items: center; justify-content: center; gap: 10px; }
.date-line-text { font-family: 'Cinzel', serif; font-size: 16px; color: #a69a80; border-top: 1px solid #d4af37; border-bottom: 1px solid #d4af37; }
.date-number-highlight { font-family: 'Cinzel', serif; font-size: 40px; color: #d4af37; font-weight: bold; }

/* All Middle Alignment Fix */
.wedding-date-badge-section,
.countdown-section,
.event-section,
.event-card,
.calendar-section,
.venue-section,
.venue-card,
.rsvp-section,
.footer {
    text-align: center !important;
}

/* Center elements inside cards and sections */
.time-box,
.calendar-header,
.calendar-grid,
.map-container {
    margin-left: auto !important;
    margin-right: auto !important;
}

/* Align buttons nicely in center */
.btn, .scroll-btn, .ctrl-btn {
    display: inline-block;
    text-align: center;
}

/* ==========================================
   ELEGANT SECTION STYLING (BOTTOM SECTION)
   ========================================== */

/* Clean Section Headings */
h2 {
    font-family: 'Cinzel', 'Playfair Display', serif;
    font-size: 26px;
    letter-spacing: 2px;
    color: #4a3b32;
    text-transform: uppercase;
    margin-top: 35px;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
}

h2::after {
    content: '';
    display: block;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #d4af37, transparent);
    margin: 8px auto 0 auto;
}

/* Elegant Cards / Container Styling */
.countdown-container, 
.event-card, 
.calendar-card, 
.venue-card, 
.rsvp-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(212, 175, 55, 0.3); /* Subtle Gold Border */
    border-radius: 16px;
    padding: 25px 20px;
    margin: 20px auto;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover, .venue-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(212, 175, 55, 0.15);
}

/* Countdown Timer Grid */
.countdown-grid {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
}

.countdown-box {
    background: #faf7f2;
    border: 1px solid #e8e0d5;
    padding: 12px 15px;
    border-radius: 12px;
    min-width: 70px;
}

.countdown-value {
    font-size: 24px;
    font-weight: 700;
    color: #8b6b47;
    font-family: 'Cinzel', serif;
}

.countdown-label {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #777;
    margin-top: 4px;
}

/* Calendar Table Polish */
.calendar-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.calendar-table th, .calendar-table td {
    padding: 10px 5px;
    text-align: center;
    font-size: 14px;
}

.calendar-table td.highlight {
    background: #d4af37;
    color: #ffffff;
    border-radius: 50%;
    font-weight: bold;
}

/* Elegant Buttons (Maps, RSVP, PDF) */
.btn-elegant, .rsvp-btn, .pdf-btn {
    background: linear-gradient(135deg, #d4af37 0%, #aa820a 100%);
    color: #ffffff !important;
    padding: 12px 28px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 14px;
    display: inline-block;
    border: none;
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
}

.btn-elegant:hover, .rsvp-btn:hover, .pdf-btn:hover {
    background: linear-gradient(135deg, #aa820a 0%, #8b6b47 100%);
    box-shadow: 0 8px 20px rgba(170, 130, 10, 0.4);
    transform: translateY(-2px);
}

/* Contact Numbers Styling */
.contact-item {
    font-size: 15px;
    color: #4a3b32;
    margin: 8px 0;
}

.contact-item strong {
    color: #8b6b47;
}

/* Footer Center Alignment & Elegant Typography */
footer {
    text-align: center !important;
    background: #111111;
    color: #e5e5e5;
    padding: 40px 20px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

footer h2 {
    font-family: 'Parisienne', 'Alex Brush', cursive !important;
    font-size: 38px !important;
    color: #d4af37 !important;
    margin-bottom: 10px;
    letter-spacing: 2px;
}

footer p {
    font-family: 'Cinzel', 'Playfair Display', serif;
    font-size: 15px;
    color: #cccccc;
    margin: 6px 0;
    text-align: center !important;
}

.developer-credit {
    font-size: 13px;
    color: #888888;
    margin-top: 15px;
    text-align: center !important;
}

/* Wedding Date Badge Size Increase */
.wedding-date-badge-section {
    margin: 25px 0;
}

.date-line-text {
    font-family: 'Cinzel', serif;
    font-size: 22px !important; /* AUGUST සහ 2026 font size එක වැඩි කර ඇත */
    letter-spacing: 3px;
    color: #8b6b47 !important;
    border-top: 1px solid #d4af37;
    border-bottom: 1px solid #d4af37;
    padding: 4px 10px;
}

.date-number-highlight {
    font-family: 'Cinzel', serif;
    font-size: 58px !important; /* '26' අංකයේ font size එක ලොකු කර ඇත */
    color: #d4af37 !important;
    font-weight: bold;
    line-height: 1;
}

/* ==========================================
   COUNTDOWN TIMER PERFECT FIX
   ========================================== */

/* 1. Countdown Box Flex & Gap Fix */
.countdown-section .countdown,
div.countdown {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 12px !important;
    margin: 20px auto !important;
}

/* 2. Box Width & Height Fix */
.countdown .time-box,
div.time-box {
    background: #ffffff !important;
    border: 1.5px solid #d4af37 !important;
    border-radius: 12px !important;
    padding: 12px 8px !important;
    width: 75px !important;
    min-width: 75px !important;
    height: 80px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.18) !important;
    margin: 0 !important;
}

/* 3. Number Font & Size Fix */
.countdown .time-box span,
div.time-box span {
    font-family: 'Cinzel', serif !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    color: #8b6b23 !important;
    line-height: 1 !important;
    margin-bottom: 4px !important;
}

/* 4. Label Font & Size Fix */
.countdown .time-box small,
div.time-box small {
    font-family: 'Poppins', sans-serif !important;
    font-size: 10px !important;
    letter-spacing: 0.8px !important;
    text-transform: uppercase !important;
    color: #666666 !important;
    line-height: 1 !important;
}
/* ==========================================
   SECTION HEADINGS FONT & STYLE CUSTOMIZATION
   ========================================== */

/* Main Headings (Wedding Ceremony, Homecoming, Venue, RSVP, Contact, etc.) */
h2, 
.section-title, 
#countdown-title {
    font-family: 'Cinzel', 'Playfair Display', serif !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    color: #8b6b23 !important; /* Gold / Bronze Color */
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    text-align: center !important;
    margin-top: 30px !important;
    margin-bottom: 20px !important;
}

/* Gold Underline Divider for Headings */
h2::after, 
.section-title::after {
    content: '' !important;
    display: block !important;
    width: 60px !important;
    height: 2px !important;
    background: #d4af37 !important;
    margin: 8px auto 0 auto !important;
    border-radius: 2px !important;
}

/* Contact Details & Card Headings */
.venue-card h3, 
.event-card h3, 
.rsvp-card h3,
.contact-section h3 {
    font-family: 'Cinzel', serif !important;
    font-size: 20px !important;
    color: #4a3b32 !important;
    letter-spacing: 1px !important;
    text-align: center !important;
}
/* ==========================================
   PREMIUM ROYAL & ELEGANT FONTS CUSTOMIZATION
   ========================================== */

/* Google Fonts Import (Cinzel Decorative & Great Vibes) */
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

/* Main Section Headings (Countdown, Wedding Ceremony, Homecoming, Venue, RSVP, Contact) */
h2, 
.section-title, 
#countdown-title {
    font-family: 'Cinzel Decorative', 'Playfair Display', serif !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    color: #8b6b23 !important;
    letter-spacing: 2.5px !important;
    text-transform: uppercase !important;
    text-align: center !important;
    margin-top: 35px !important;
    margin-bottom: 22px !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* Gold Underline Divider for Headings */
h2::after, 
.section-title::after {
    content: '' !important;
    display: block !important;
    width: 70px !important;
    height: 2px !important;
    background: linear-gradient(90deg, transparent, #d4af37, transparent) !important;
    margin: 10px auto 0 auto !important;
    border-radius: 2px !important;
}

/* Sub-titles & Card Headings (Wedding Venue, Contact Person Names) */
.venue-card h3, 
.event-card h3, 
.rsvp-card h3,
.contact-section h3 {
    font-family: 'Playfair Display', serif !important;
    font-size: 21px !important;
    font-weight: 600 !important;
    color: #4a3b32 !important;
    letter-spacing: 1px !important;
    text-align: center !important;
}
/* ==========================================
   BERKSHIRE SWASH ELEGANT FONT INTEGRATION
   ========================================== */

/* Google Fonts Import - Berkshire Swash */
@import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

/* Apply Berkshire Swash to Main Headings (Countdown, Wedding Ceremony, Homecoming, Venue, RSVP, Contact) */
h2, 
.section-title, 
#countdown-title {
    font-family: 'Berkshire Swash', cursive !important;
    font-size: 28px !important;
    font-weight: 400 !important;
    color: #8b6b23 !important;
    letter-spacing: 1px !important;
    text-transform: none !important; /* Berkshire Swash font එක කැපී පෙනීමට Normal Case/Title Case තබා ඇත */
    text-align: center !important;
    margin-top: 35px !important;
    margin-bottom: 20px !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* Gold Underline Divider for Headings */
h2::after, 
.section-title::after {
    content: '' !important;
    display: block !important;
    width: 65px !important;
    height: 2px !important;
    background: linear-gradient(90deg, transparent, #d4af37, transparent) !important;
    margin: 8px auto 0 auto !important;
    border-radius: 2px !important;
}

/* Sub-titles & Card Headings (Wedding Venue, Contact Person Names) */
.venue-card h3, 
.event-card h3, 
.rsvp-card h3,
.contact-section h3 {
    font-family: 'Berkshire Swash', cursive !important;
    font-size: 22px !important;
    font-weight: 400 !important;
    color: #4a3b32 !important;
    letter-spacing: 0.5px !important;
    text-align: center !important;
}
/* ==========================================
   HERO TEXT SPACING & PARENTS TITLE SIZE
   ========================================== */

/* Photo එකෙන් පස්සේ එන Text කොටස පහළට කිරීම (Margin/Spacing Increase) */
.hero-content-below {
    margin-top: 50px !important; /* Photo එකෙන් 1' ප්‍රමාණයකට පහළට කරයි */
    padding-top: 10px !important;
}

/* DAUGHTER OF & SON OF Font Size Increase */
.parents-title {
    font-family: 'Cinzel', serif !important;
    font-size: 18px !important; /* Font Size එක 18px දක්වා වැඩි කර ඇත */
    font-weight: 700 !important;
    color: #8b6b23 !important; /* Gold tone finish */
    letter-spacing: 2px !important;
    margin-top: 20px !important;
    margin-bottom: 6px !important;
}

/* Parents Names Font Styling */
.parents-names {
    font-size: 13px !important;
    letter-spacing: 1px !important;
    color: #555555 !important;
    margin-bottom: 12px !important;
}
/* ==========================================
   PARENTS NAMES FONT SIZE INCREASE
   ========================================== */

.parents-names {
    font-family: 'Poppins', sans-serif !important;
    font-size: 16px !important; /* Font size එක 13px සිට 16px දක්වා ලොකු කර ඇත */
    font-weight: 500 !important;
    color: #4a3b32 !important;
    letter-spacing: 1px !important;
    line-height: 1.5 !important;
    margin-bottom: 15px !important;
}
/* ==========================================
   COUPLE NAMES FONT CHANGE (HIGH CLARITY)
   ========================================== */

/* Import Pinyon Script & Playfair Display (Alternative Serif) Fonts */
@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@1,500&display=swap');

/* Chathurni Sanchala & Ashen Anuradha Font Styling */
.couple-name {
    font-family: 'Pinyon Script', cursive !important;
    font-size: 48px !important; /* අකුරු ඉතා පැහැදිලිව පෙනීමට Size එක වැඩි කර ඇත */
    font-weight: 400 !important;
    color: #8b6b23 !important; /* Premium Gold Tone */
    letter-spacing: 0px !important; /* Script fonts වලට letter-spacing 0 තැබීම සුදුසුයි */
    line-height: 1.1 !important;
    margin-top: 5px !important;
    margin-bottom: 10px !important;
    text-transform: none !important;
    text-shadow: 0 1px 1px rgba(0,0,0,0.05); /* Soft shadow for better clarity */
}

/* '&' Symbol Styling */
.and {
    font-family: 'Playfair Display', serif !important;
    font-style: italic !important;
    font-size: 28px !important;
    font-weight: 500 !important;
    color: #d4af37 !important;
    margin: 8px 0 !important;
    display: block !important;
}/* ==========================================
   COUPLE NAMES FONT CHANGE (HIGH CLARITY)
   ========================================== */

/* Import Pinyon Script & Playfair Display (Alternative Serif) Fonts */
@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@1,500&display=swap');

/* Chathurni Sanchala & Ashen Anuradha Font Styling */
.couple-name {
    font-family: 'Pinyon Script', cursive !important;
    font-size: 48px !important; /* අකුරු ඉතා පැහැදිලිව පෙනීමට Size එක වැඩි කර ඇත */
    font-weight: 400 !important;
    color: #8b6b23 !important; /* Premium Gold Tone */
    letter-spacing: 0px !important; /* Script fonts වලට letter-spacing 0 තැබීම සුදුසුයි */
    line-height: 1.1 !important;
    margin-top: 5px !important;
    margin-bottom: 10px !important;
    text-transform: none !important;
    text-shadow: 0 1px 1px rgba(0,0,0,0.05); /* Soft shadow for better clarity */
}

/* '&' Symbol Styling */
.and {
    font-family: 'Playfair Display', serif !important;
    font-style: italic !important;
    font-size: 28px !important;
    font-weight: 500 !important;
    color: #d4af37 !important;
    margin: 8px 0 !important;
    display: block !important;
}
/* ==========================================
   PARENTS NAMES BOLD FONT STYLING
   ========================================== */

.parents-names {
    font-family: 'Poppins', sans-serif !important;
    font-size: 16px !important;
    font-weight: 700 !important; /* Bold කිරීමට 700 ලෙස වෙනස් කර ඇත */
    color: #333333 !important; /* වඩාත් පැහැදිලි තද පැහැයක් */
    letter-spacing: 1px !important;
    line-height: 1.5 !important;
    margin-bottom: 15px !important;
}
/* ==========================================
   GWENDOLYN FONT INTEGRATION FOR COUPLE NAMES
   ========================================== */

/* Google Fonts Import - Gwendolyn Font */
@import url('https://fonts.googleapis.com/css2?family=Gwendolyn:wght@400;700&family=Playfair+Display:ital,wght@1,500&display=swap');

/* Chathurni Sanchala & Ashen Anuradha Font Styling */
.couple-name {
    font-family: 'Gwendolyn', cursive !important;
    font-size: 50px !important; /* Gwendolyn Font එක පැහැදිලිව පෙනීමට Size එක 50px කර ඇත */
    font-weight: 700 !important;
    color: #8b6b23 !important; /* Gold Tone */
    letter-spacing: 0px !important;
    line-height: 1.2 !important;
    margin-top: 5px !important;
    margin-bottom: 12px !important;
    text-transform: none !important;
    text-shadow: 0 1px 1px rgba(0,0,0,0.05);
}

/* '&' Symbol Styling */
.and {
    font-family: 'Gwendolyn', cursive !important;
    font-size: 38px !important;
    font-weight: 700 !important;
    color: #d4af37 !important;
    margin: 6px 0 !important;
    display: block !important;
}
/* Gwendolyn Font for Couple Names */
.couple-name {
    font-family: 'Gwendolyn', cursive !important;
    font-size: 52px !important;
    font-weight: 700 !important;
    color: #8b6b23 !important;
    line-height: 1.2 !important;
    text-transform: none !important;
}

.and {
    font-family: 'Gwendolyn', cursive !important;
    font-size: 38px !important;
    font-weight: 700 !important;
    color: #d4af37 !important;
}
/* Falling & Swinging Animation (Slower Wind Effect) */
@keyframes fallAndSway {
    0% {
        opacity: 0;
        transform: translateY(0) rotate(0deg) translateX(0);
    }
    10% {
        opacity: 0.85;
    }
    50% {
        transform: translateY(50vh) rotate(120deg) translateX(35px);
    }
    75% {
        transform: translateY(75vh) rotate(220deg) translateX(-20px);
    }
    100% {
        opacity: 0;
        transform: translateY(105vh) rotate(320deg) translateX(45px);
    }
}
