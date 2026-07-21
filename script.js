document.addEventListener("DOMContentLoaded", function () {
    console.log("Wedding Website Loaded with Darker & More Flowers!");

    // --- 1. Remove Preloader ---
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 1000);
    }

    // --- 2. Music Player Setup ---
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

    // --- 3. More & Darker Flowers Effect ---
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

    const flowerCount = 25; // මල් ගණන 25 දක්වා වැඩි කළා
    const flowers = [];

    class DarkerFlower {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.r = Math.random() * 5 + 4; // මලක ප්‍රමාණය පොඩ්ඩක් ලොකු කළා
            this.vs = Math.random() * 0.7 + 0.3; // වැටෙන වේගය
            this.ys = Math.random() * 1;
            this.angle = Math.random() * 360;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);

            // තවත් කැපී පෙනෙන Dark Romantic Pink Color එක
            ctx.fillStyle = 'rgba(230, 100, 140, 0.65)';
            
            // පෙති 5 මල
            for (let i = 0; i < 5; i++) {
                ctx.rotate(72 * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, this.r, this.r / 1.4, this.r, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
            
            // මැද රන්වන්/තද තිත (Dark Gold Center)
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
