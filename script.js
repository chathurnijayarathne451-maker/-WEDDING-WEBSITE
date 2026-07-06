document.addEventListener("DOMContentLoaded", function () {
    console.log("Wedding Website Loaded Successfully!");

    // --- 1. Music Player Setup ---
    const music = document.getElementById("wedding-music");
    const musicBtn = document.getElementById("music-btn");

    if (music && musicBtn) {
        // මුලින්ම Music Auto-play වෙන්න උත්සාහ කිරීම
        music.play().then(() => {
            musicBtn.innerHTML = "🎵 Pause Music";
        }).catch(() => {
            console.log("Autoplay blocked by browser. Waiting for user interaction.");
            musicBtn.innerHTML = "🎵 Play Music";
        });

        // බටන් එක ක්ලික් කළ විට වැඩ කරන ආකාරය
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

    // --- 2. Lite Rose Petals Falling Effect ---
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none'; // බටන් ක්ලික් කිරීමට බාධා නොවේ

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = 20; // සයිට් එක Slow නොවීමට පෙති ගණන ලිමිට් කර ඇත
    const petals = [];

    class Petal {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.r = Math.random() * 6 + 4; // පෙත්තේ ප්‍රමාණය
            this.d = Math.random() * petalCount;
            this.w = Math.random() * 2;
            this.vs = Math.random() * 0.8 + 0.4; // පහළට වැටෙන වේගය (හරිම හෙමින්)
            this.ys = Math.random() * 1;
        }

        draw() {
            ctx.beginPath();
            // ඉතාම ලා රෝස පාටක් (Very Soft Pastel Pink)
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
            this.x += Math.sin(this.ys) * 0.4; // හුළඟට පාවෙනවා වැනි හැඟීමක්
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
