document.addEventListener("DOMContentLoaded", function () {
    console.log("Wedding Website Loaded with Light Flower Effect!");

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

    // --- 3. Light & Elegant Flower Effect (No Rose Petals) ---
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

    const flowerCount = 12; // සයිට් එක Slow නොවෙන්න මල් ගණන 12ට අඩු කළා
    const flowers = [];

    class LightFlower {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.r = Math.random() * 4 + 3; // කුඩා ලස්සන මලක ප්‍රමාණය
            this.vs = Math.random() * 0.5 + 0.2; // හෙමින් වැටෙන සන්සුන් වේගය
            this.ys = Math.random() * 1;
            this.angle = Math.random() * 360;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);

            // ඉතාම ලා Soft Pink/Translucent Color එක (රෝස පෙති පාට නෙවෙයි, මලක පාට)
            ctx.fillStyle = 'rgba(255, 230, 235, 0.3)';
            
            // පෙති 5 මල
            for (let i = 0; i < 5; i++) {
                ctx.rotate(72 * Math.PI / 180);
                ctx.beginPath();
                ctx.ellipse(0, this.r, this.r / 1.5, this.r, 0, 0, 2 * Math.PI);
                ctx.fill();
            }
            
            // මැද රන්වන් තිත
            ctx.beginPath();
            ctx.arc(0, 0, this.r / 3, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
            ctx.fill();

            ctx.restore();
        }

        update() {
            this.y += this.vs;
            this.x += Math.sin(this.ys) * 0.3;
            this.ys += 0.005;
            this.angle += 0.3;

            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }
    }

    for (let i = 0; i < flowerCount; i++) {
        flowers.push(new LightFlower());
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
