document.addEventListener("DOMContentLoaded", function () {
    console.log("Wedding Website Loaded Successfully!");

    // --- 1. Remove Loading Screen (සයිට් එක ලෝඩ් වුණු ගමන් Loading Screen එක අයින් කිරීම) ---
    const loadingScreen = document.getElementById("loading-screen") || document.querySelector(".loader-wrapper") || document.querySelector(".loading");
    if (loadingScreen) {
        // සයිට් එක ලෝඩ් වී අවසන් වූ පසු ලෝඩරය අයින් කරයි
        loadingScreen.style.display = "none"; 
    }

    // --- 2. Music Player Setup (Error නොඑන ලෙස සකසා ඇත) ---
    const music = document.getElementById("wedding-music") || document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-btn") || document.getElementById("play-btn");

    if (music && musicBtn) {
        music.play().then(() => {
            musicBtn.innerHTML = "🎵 Pause Music";
        }).catch(() => {
            console.log("Autoplay blocked. Waiting for click.");
        });

        musicBtn.addEventListener("click", function () {
            if (music.paused) {
                music.play();
                musicBtn.innerHTML = "🎵 Pause Music";
            } else {
                music.pause();
                musicBtn.innerHTML = "🎵 Play Music";
            }
        });
    }

    // --- 3. Lite Rose Petals Falling Effect ---
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = 20; 
    const petals = [];

    class Petal {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.r = Math.random() * 6 + 4;
            this.d = Math.random() * petalCount;
            this.w = Math.random() * 2;
            this.vs = Math.random() * 0.8 + 0.4;
            this.ys = Math.random() * 1;
        }

        draw() {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 192, 203, 0.35)'; 
            ctx.strokeStyle = 'rgba(255, 182, 193, 0.4)';
            
            ctx.moveTo(this.x, this.y);
            ctx.quadraticCurveTo(this.x - this.r, this.y + this.r, this.x, this.y + this.r * 2);
            ctx.quadraticCurveTo(this.x + this.r, this.y + this.r, this.x, this.y);
            ctx.fill();
            ctx.stroke();
        }

        update() {
            this.y += this.vs;
            this.x += Math.sin(this.ys) * 0.4;
            this.ys += 0.01;

            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(petal => {
            petal.draw();
            petal.update();
        });
        requestAnimationFrame(animate);
    }

    animate();
});
